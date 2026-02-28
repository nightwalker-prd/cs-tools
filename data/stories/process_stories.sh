#!/bin/bash

# Parallel Claude Code PDF Story Processor
# Processes all PDF files in stories directory using Claude Code
# Each PDF gets its own directory with translation and analysis in markdown format

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR"
MAX_PARALLEL=1  # Default to sequential to avoid output mixing
FORCE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --force|-f)
            FORCE=true
            shift
            ;;
        --parallel|-p)
            MAX_PARALLEL="${2:-2}"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--force|-f] [--parallel|-p N]"
            echo "  --force, -f      Reprocess all PDFs, ignoring existing results"
            echo "  --parallel, -p N Run N instances in parallel (default: 1 sequential)"
            exit 1
            ;;
    esac
done

# Check if output directory exists
if [ ! -d "$OUTPUT_DIR" ]; then
    echo "Error: output/ directory not found"
    exit 1
fi

# Count PDFs
pdf_count=$(find "$OUTPUT_DIR" -maxdepth 1 -name "*.pdf" | wc -l | tr -d ' ')
echo "Found $pdf_count PDF files to process"

if [ "$pdf_count" -eq 0 ]; then
    echo "No PDF files found in output/ directory"
    exit 0
fi

# Track background jobs
declare -a pids
declare -a pdf_names
declare -a log_files
running=0
completed=0

# Function to check job status and report completions
check_jobs() {
    for i in "${!pids[@]}"; do
        if [ -n "${pids[$i]}" ]; then
            if ! kill -0 "${pids[$i]}" 2>/dev/null; then
                # Job finished
                wait "${pids[$i]}" 2>/dev/null || true
                ((completed++)) || true
                echo ""
                echo "[$completed/$pdf_count] COMPLETED: ${pdf_names[$i]}"

                # Show summary of created files
                answer_dir="$OUTPUT_DIR/${pdf_names[$i]}"
                md_count=$(find "$answer_dir" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
                echo "  -> Created $md_count markdown file(s) in ${pdf_names[$i]}/"

                # Show last few lines of log if there were issues
                if [ -f "${log_files[$i]}" ]; then
                    if grep -qi "error\|failed\|exception" "${log_files[$i]}" 2>/dev/null; then
                        echo "  -> WARNING: Possible errors in log. Check: ${log_files[$i]}"
                    fi
                fi

                unset 'pids[i]'
                unset 'pdf_names[i]'
                unset 'log_files[i]'
                ((running--)) || true
            fi
        fi
    done
    # Compact arrays
    pids=("${pids[@]}")
    pdf_names=("${pdf_names[@]}")
    log_files=("${log_files[@]}")
}

# Function to wait for a slot to open up
wait_for_slot() {
    while [ $running -ge $MAX_PARALLEL ]; do
        check_jobs
        if [ $running -ge $MAX_PARALLEL ]; then
            sleep 3
        fi
    done
}

# Function to show status
show_status() {
    echo ""
    echo "=== STATUS: $running running, $completed/$pdf_count completed ==="
    for i in "${!pids[@]}"; do
        if [ -n "${pdf_names[$i]}" ]; then
            echo "  [RUNNING] ${pdf_names[$i]} (PID: ${pids[$i]})"
        fi
    done
}

# Count already completed
already_done=0
for pdf_file in "$OUTPUT_DIR"/*.pdf; do
    pdf_basename=$(basename "$pdf_file" .pdf)
    answer_dir="$OUTPUT_DIR/$pdf_basename"
    if [ -d "$answer_dir" ]; then
        md_count=$(find "$answer_dir" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
        if [ "$md_count" -gt 0 ]; then
            ((already_done++)) || true
        fi
    fi
done

echo ""
if [ "$MAX_PARALLEL" -eq 1 ]; then
    echo "=== Running SEQUENTIALLY (one at a time for reliability) ==="
else
    echo "=== Running with $MAX_PARALLEL parallel instances ==="
fi
if [ "$FORCE" = true ]; then
    echo "=== FORCE MODE: Reprocessing all $pdf_count PDFs ==="
elif [ "$already_done" -gt 0 ]; then
    echo "=== Found $already_done already completed, $((pdf_count - already_done)) remaining ==="
fi
echo "=== Monitor logs with: tail -f output/*/claude_log.txt ==="
echo ""

# Process each PDF file
job_num=0
skipped=0
for pdf_file in "$OUTPUT_DIR"/*.pdf; do
    ((job_num++)) || true

    # Get the base name without extension
    pdf_basename=$(basename "$pdf_file" .pdf)

    # Create output directory for this PDF
    answer_dir="$OUTPUT_DIR/$pdf_basename"

    # Check if already processed (has markdown files other than log)
    if [ "$FORCE" = false ] && [ -d "$answer_dir" ]; then
        md_count=$(find "$answer_dir" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
        if [ "$md_count" -gt 0 ]; then
            ((skipped++)) || true
            echo "[$job_num/$pdf_count] SKIPPED (already done): $pdf_basename ($md_count files)"
            ((completed++)) || true
            continue
        fi
    fi

    mkdir -p "$answer_dir"
    log_file="$answer_dir/claude_log.txt"

    # Wait for a slot if we're at max parallel
    wait_for_slot

    echo "[$job_num/$pdf_count] STARTING: $pdf_basename"

    # Launch Claude Code in background
    (
        echo "========================================" > "$log_file"
        echo "=== Processing: $pdf_basename ===" >> "$log_file"
        echo "=== Started: $(date) ===" >> "$log_file"
        echo "=== PDF: $pdf_file ===" >> "$log_file"
        echo "=== Working dir: $answer_dir ===" >> "$log_file"
        echo "========================================" >> "$log_file"
        echo "" >> "$log_file"

        # Check if PDF exists
        if [ -f "$pdf_file" ]; then
            echo "[OK] PDF file exists" >> "$log_file"
            echo "[INFO] PDF size: $(ls -lh "$pdf_file" | awk '{print $5}')" >> "$log_file"
        else
            echo "[ERROR] PDF file NOT found: $pdf_file" >> "$log_file"
        fi
        echo "" >> "$log_file"

        cd "$answer_dir"
        echo "[INFO] Changed to directory: $(pwd)" >> "$log_file"
        echo "[INFO] Launching Claude..." >> "$log_file"
        echo "" >> "$log_file"
        echo "--- CLAUDE OUTPUT START ---" >> "$log_file"

        # Run Claude and capture exit code
        set +e
        unset CLAUDECODE
        claude -p "Read the PDF file at \"$pdf_file\". Translate this text into English please and write it to a markdown file with English and Arabic, also identify vocabulary and grammatical structures and analyse them and write that to the same markdown file. Use the Write tool to save the output as a .md file in the current directory." \
            --allowedTools "Read,Write,Bash" \
            >> "$log_file" 2>&1
        exit_code=$?
        set -e

        echo "--- CLAUDE OUTPUT END ---" >> "$log_file"
        echo "" >> "$log_file"
        echo "========================================" >> "$log_file"
        echo "=== Exit code: $exit_code ===" >> "$log_file"
        echo "=== Finished: $(date) ===" >> "$log_file"

        # Count created files
        md_count=$(find . -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
        echo "=== Files in directory: ===" >> "$log_file"
        ls -la >> "$log_file" 2>&1
        echo "" >> "$log_file"
        echo "=== Created $md_count markdown files ===" >> "$log_file"

        if [ "$exit_code" -ne 0 ]; then
            echo "[ERROR] Claude exited with code $exit_code" >> "$log_file"
        fi
        if [ "$md_count" -eq 0 ]; then
            echo "[WARNING] No markdown files were created" >> "$log_file"
        fi
        echo "========================================" >> "$log_file"
    ) &

    last_pid=$!
    pids+=($last_pid)
    pdf_names+=("$pdf_basename")
    log_files+=("$log_file")
    ((running++)) || true

    # Show status every 4 jobs
    if [ $((job_num % 4)) -eq 0 ]; then
        show_status
    fi
done

echo ""
echo "=== All $pdf_count jobs launched. Waiting for completion... ==="
echo ""

# Wait for remaining jobs
while [ $running -gt 0 ]; do
    check_jobs
    if [ $running -gt 0 ]; then
        sleep 5
        echo "... $running job(s) still running, $completed/$pdf_count completed ..."
    fi
done

echo ""
echo "=========================================="
echo "ALL PROCESSING COMPLETE!"
echo "=========================================="
echo "  Total PDFs: $pdf_count"
echo "  Skipped (already done): $skipped"
echo "  Processed this run: $((pdf_count - skipped))"
echo ""
echo "Results are in: $OUTPUT_DIR/<pdf_name>/"
echo ""
echo "Summary of created files:"
for dir in "$OUTPUT_DIR"/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        md_count=$(find "$dir" -name "*.md" ! -name "claude_log.txt" 2>/dev/null | wc -l | tr -d ' ')
        if [ "$md_count" -gt 0 ]; then
            echo "  $dirname: $md_count file(s)"
        fi
    fi
done
