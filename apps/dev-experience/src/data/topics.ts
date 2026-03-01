export interface Concept {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  tradeoffs?: string[];
  realWorld?: string[];
}

export interface Topic {
  id: number;
  title: string;
  part: number;
  partTitle: string;
  summary: string;
  concepts: Concept[];
}

export type Chapter = Topic;

export const parts = [
  { id: 1, title: 'Shell & Command Line' },
  { id: 2, title: 'Git Mastery' },
  { id: 3, title: 'Automation & Productivity' },
  { id: 4, title: 'Advanced Developer Tools' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Shell & Command Line (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Bash Fundamentals',
    part: 1,
    partTitle: 'Shell & Command Line',
    summary:
      'Shell types, configuration files, environment variables, PATH management, and command chaining — the foundation of every terminal workflow.',
    concepts: [
      {
        id: 'shell-types-config',
        name: 'Shell Types & Configuration',
        description:
          'Understanding login vs non-login shells, interactive vs non-interactive, and how .bashrc, .zshrc, and .profile are sourced differently depending on shell type.',
        keyPoints: [
          'Login shells (SSH, terminal login) source .profile or .bash_profile first, while interactive non-login shells (new terminal tab) source .bashrc — macOS Terminal.app opens login shells by default, which is why many users only have .bash_profile',
          'The $SHELL variable shows your default shell, but the running shell may differ — use echo $0 or ps -p $$ to check the actual shell process',
          'Sourcing a file (source ~/.bashrc or . ~/.bashrc) runs it in the current shell, while executing (bash ~/.bashrc) runs it in a subshell where changes to environment variables are lost',
          'Zsh uses .zshrc for interactive shells and .zprofile for login shells — oh-my-zsh and other frameworks add layers on top, which can slow shell startup if plugins are excessive',
          'Non-interactive shells (scripts, cron jobs) skip .bashrc/.zshrc entirely — this is why cron jobs often fail when they depend on PATH or aliases defined in your interactive shell config',
        ],
        tradeoffs: [
          'Putting everything in .bashrc keeps configuration simple but means login shells may miss settings unless .bash_profile explicitly sources .bashrc',
          'Switching from bash to zsh or fish gives better interactive features (autosuggestions, syntax highlighting) but breaks bash-specific syntax in config files and requires migration effort',
        ],
        realWorld: [
          'Debugging why SSH sessions have different PATH than local terminals by checking .profile vs .bashrc sourcing order',
          'Setting up .zshrc with oh-my-zsh plugins while keeping startup time under 200ms by lazy-loading heavy plugins like nvm',
          'Using /etc/profile.d/ drop-in files on Linux servers to configure environment for all users without editing individual shell configs',
        ],
      },
      {
        id: 'env-vars-path',
        name: 'Environment Variables & PATH',
        description:
          'Managing environment variables, understanding PATH ordering and precedence, and using tools like direnv for per-project environment configuration.',
        keyPoints: [
          'export VAR=value makes a variable available to child processes, while VAR=value without export keeps it local to the current shell — use export for PATH, EDITOR, and variables scripts need',
          'PATH is searched left-to-right, so directories listed first take precedence — prepending ($PATH:/new) vs appending (/new:$PATH) determines whether your custom binaries override system ones',
          'Variable expansion with defaults: ${VAR:-default} uses "default" if VAR is unset or empty, ${VAR:=default} also assigns the default, and ${VAR:?error} exits with an error message if unset',
          'direnv loads .envrc files automatically when you cd into a project directory, providing per-project environment variables without polluting your global shell config — combine with .env files for secrets',
          'printenv shows all exported variables, env runs a command with modified environment (env VAR=x command), and set shows all variables including non-exported ones and shell functions',
        ],
        tradeoffs: [
          'Hardcoding paths in scripts is fragile but explicit, while relying on PATH is flexible but can break when PATH changes or multiple versions of a tool exist',
          'Using .env files with direnv keeps secrets out of shell config but requires team members to set up direnv and creates risk of .env files being committed to git without proper .gitignore rules',
        ],
        realWorld: [
          'Debugging "command not found" by running echo $PATH and verifying the binary location with which or command -v',
          'Using direnv with .envrc to automatically activate Python virtualenvs and set AWS credentials per project',
          'Setting EDITOR=vim and VISUAL=code for different editing contexts (terminal vs GUI) in shell config',
        ],
      },
      {
        id: 'command-chaining',
        name: 'Command Chaining & Redirection',
        description:
          'Combining commands with operators (&&, ||, |, ;) and controlling I/O with redirection (>, >>, 2>&1) — the building blocks of shell pipelines.',
        keyPoints: [
          '&& (AND) runs the next command only if the previous succeeds (exit code 0), while || (OR) runs it only if the previous fails — combine them for if/else patterns: command && echo "ok" || echo "failed"',
          'Pipes (|) connect stdout of one command to stdin of the next, creating data processing pipelines — each command in a pipe runs in a subshell, so variable changes inside pipes are lost in bash (but not zsh with setopt lastpipe)',
          'Redirect stdout with > (overwrite) or >> (append), stderr with 2>, and both with &> or 2>&1 — the order matters: command > file 2>&1 captures both, but command 2>&1 > file only redirects stdout to the file',
          'Process substitution <(command) treats command output as a file, enabling tools that expect file arguments to read from commands — diff <(sort file1) <(sort file2) compares sorted versions without temporary files',
          'tee splits output to both stdout and a file simultaneously — command | tee output.log shows results on screen while saving them, and tee -a appends instead of overwriting',
        ],
        tradeoffs: [
          'Long pipe chains are powerful and composable but hard to debug — a failure in the middle is silent by default unless you use set -o pipefail or check ${PIPESTATUS[@]}',
          'Using /dev/null to discard output keeps things clean but can hide errors — redirect only what you intend (2>/dev/null for stderr only) rather than &>/dev/null which silences everything',
        ],
        realWorld: [
          'Building a log analysis pipeline: cat access.log | grep 500 | awk \'{print $1}\' | sort | uniq -c | sort -rn | head',
          'Using tee with sudo: echo "config line" | sudo tee -a /etc/hosts (because sudo echo "..." > /etc/hosts fails since redirection happens before sudo)',
          'Comparing remote and local configs with diff <(ssh server cat /etc/nginx.conf) /etc/nginx.conf',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Text Processing',
    part: 1,
    partTitle: 'Shell & Command Line',
    summary:
      'Master grep, sed, awk, and jq — the Swiss Army knives for searching, transforming, and processing text and structured data in the terminal.',
    concepts: [
      {
        id: 'grep-ripgrep',
        name: 'grep & ripgrep Pattern Matching',
        description:
          'Searching file contents with regular expressions using grep and its modern replacement ripgrep (rg), with options for context, recursion, and filtering.',
        keyPoints: [
          'grep -E (extended regex) enables +, ?, |, and () without escaping — use -P for Perl-compatible regex (lookahead, lookbehind) when you need advanced patterns',
          'Recursive search with grep -r searches all files in a directory, but ripgrep (rg) is 10-100x faster because it respects .gitignore, skips binary files, and uses parallelism by default',
          'Context flags -A (after), -B (before), -C (context) show surrounding lines — rg -C3 "TODO" shows 3 lines around each match, invaluable for understanding code context',
          'Use -l (files-with-matches) to list only filenames, -c for counts, and -v to invert matches — combine with -w for whole-word matching to avoid partial hits',
          'ripgrep supports --type for language-specific searches (rg --type ts "interface") and --glob for pattern filtering (rg --glob "*.test.*" "describe") without needing find | xargs',
        ],
        tradeoffs: [
          'grep is universally available on all Unix systems while ripgrep must be installed separately, but rg is so much faster on large codebases that the installation overhead is negligible for regular use',
          'Simple string matching with grep -F (fixed strings) is faster than regex and avoids escaping issues, but regex is essential for pattern matching like IP addresses, log formats, or variable naming conventions',
        ],
        realWorld: [
          'Finding all TODO/FIXME comments across a codebase: rg "TODO|FIXME|HACK" --type ts -C2',
          'Searching for function definitions: rg "function\\s+\\w+" --type js or rg "def \\w+" --type py',
          'Filtering log files for errors in a time range: grep "2024-01-15 1[4-6]:" error.log | grep -i "exception"',
        ],
      },
      {
        id: 'sed-awk',
        name: 'sed & awk Essentials',
        description:
          'Stream editing with sed for substitution and transformation, and field-based processing with awk for structured text extraction and reporting.',
        keyPoints: [
          'sed s/old/new/g replaces all occurrences on each line — without g, only the first match per line is replaced; use -i for in-place editing (GNU sed) or -i "" on macOS BSD sed',
          'sed address ranges limit operations to specific lines: sed "10,20s/old/new/" (lines 10-20), sed "/start/,/end/d" (delete between patterns), sed "1d" (delete first line)',
          'awk splits lines into fields by whitespace: $1 is the first field, $NF is the last, NR is the line number — awk \'{print $1, $NF}\' extracts first and last columns',
          'awk pattern-action blocks run selectively: awk "/ERROR/ {print $0}" processes only matching lines, awk "NR>1 {sum+=$3} END {print sum}" skips headers and sums column 3',
          'For CSV processing, use awk -F"," to set the field separator — but for complex CSVs with quoted fields, prefer dedicated tools like csvkit or Miller (mlr) which handle edge cases properly',
        ],
        tradeoffs: [
          'sed is simpler for line-by-line substitution but awk is more powerful for column-based operations — using sed for field extraction requires complex regex while awk handles it naturally with $N notation',
          'In-place sed editing (-i) modifies files directly which is convenient but risky without backups — sed -i.bak creates a backup, but clutters the directory with .bak files that need cleanup',
        ],
        realWorld: [
          'Batch renaming in files: find . -name "*.ts" -exec sed -i "s/oldFunction/newFunction/g" {} +',
          'Extracting and summarizing access logs: awk \'{print $1}\' access.log | sort | uniq -c | sort -rn | head -20 (top 20 IPs)',
          'Converting between formats: awk -F"," \'{print $2 "\\t" $1}\' data.csv > data.tsv (CSV to TSV with column reorder)',
        ],
      },
      {
        id: 'jq-json',
        name: 'jq for JSON Processing',
        description:
          'Processing, filtering, and transforming JSON data on the command line with jq — essential for working with APIs, config files, and modern data formats.',
        keyPoints: [
          'Basic jq filters: .field extracts a key, .[] iterates array elements, .[0] gets the first element — chain with pipes: .data[] | .name extracts names from an array inside a data field',
          'select() filters elements: .[] | select(.age > 30) keeps only matching objects, while map() transforms arrays: [.[] | .name] collects all names into a new array',
          'Construct new objects with {key: .field}: .[] | {name: .full_name, email: .contact.email} reshapes data, and string interpolation uses \\(.field) inside quotes',
          'jq works in API pipelines: curl -s api.example.com/users | jq ".data[] | {id, name}" — the -r flag outputs raw strings without quotes, useful for piping to other commands',
          'Advanced: reduce for accumulation, group_by for grouping, @csv/@tsv for format conversion, and --arg for passing shell variables into jq expressions (jq --arg name "$USER" \'.[] | select(.user == $name)\')',
        ],
        tradeoffs: [
          'jq is powerful for JSON but has its own expression language that takes time to learn — for simple field extraction, tools like jq ".name" work, but complex transformations require understanding jq\'s functional pipeline model',
          'jq processes entire files in memory which is fine for API responses but can be slow for huge JSON files (100MB+) — for large datasets, consider streaming with jq --stream or using tools like gron that convert JSON to greppable output',
        ],
        realWorld: [
          'Extracting deployment info: kubectl get pods -o json | jq ".items[] | {name: .metadata.name, status: .status.phase}"',
          'Parsing GitHub API responses: gh api repos/:owner/:repo/releases | jq ".[0] | {tag: .tag_name, date: .published_at}"',
          'Transforming package.json dependencies: jq ".dependencies | to_entries[] | .key + \"@\" + .value" package.json',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'File & Directory Operations',
    part: 1,
    partTitle: 'Shell & Command Line',
    summary:
      'Advanced file discovery with find/fd, batch execution with xargs, and Unix permissions — essential skills for managing codebases and servers.',
    concepts: [
      {
        id: 'find-fd',
        name: 'find & fd Advanced Usage',
        description:
          'Discovering files by type, size, date, and name patterns with find and its modern alternative fd — the foundation for any bulk file operation.',
        keyPoints: [
          'find filters by type (-type f for files, -type d for directories), size (-size +1M for over 1MB), and modification time (-mtime -7 for last 7 days, -newer reference_file for newer than a file)',
          'find -exec runs a command per match: find . -name "*.log" -exec gzip {} \\; (one at a time) vs -exec gzip {} + (batched, faster) — the + variant is like piping to xargs',
          'fd is a modern find alternative that is 5-10x faster, uses regex by default, respects .gitignore, and has simpler syntax: fd "*.ts" is equivalent to find . -name "*.ts" -type f',
          'Combine find with -prune to skip directories: find . -path ./node_modules -prune -o -name "*.js" -print avoids searching inside node_modules',
          'find -delete removes matched files (faster than -exec rm) but be careful — always test with -print first, and note that -delete implies -depth which processes children before parents',
        ],
        tradeoffs: [
          'find is universally available and feature-rich but its syntax is arcane (operators like -a, -o, \\! and escaping requirements) — fd has cleaner ergonomics but must be installed and lacks some advanced find features',
          'Using -exec for each file is simple but slow for thousands of files — batching with + or piping to xargs with -P for parallelism can be orders of magnitude faster for CPU-bound operations',
        ],
        realWorld: [
          'Cleaning build artifacts: find . -name "node_modules" -type d -prune -exec rm -rf {} + (remove all node_modules in a monorepo)',
          'Finding large files: find / -type f -size +100M -exec ls -lh {} + 2>/dev/null | sort -k5 -h (sorted by size)',
          'Finding recently modified source files: fd -e ts -e tsx --changed-within 1d (files changed in last day)',
        ],
      },
      {
        id: 'xargs-parallel',
        name: 'xargs & Parallel Execution',
        description:
          'Converting stdin to command arguments with xargs and running operations in parallel — the glue that connects find, grep, and other tools to batch processing.',
        keyPoints: [
          'xargs reads whitespace-delimited input from stdin and passes it as arguments to a command — echo "a b c" | xargs echo runs echo a b c, processing all items in one invocation',
          'Use -I {} for placeholder substitution: find . -name "*.bak" | xargs -I {} mv {} {}.old — the placeholder lets you control where each input item is placed in the command',
          'Handle filenames with spaces using null delimiters: find . -name "*.txt" -print0 | xargs -0 wc -l — the -print0/-0 pair uses null bytes instead of newlines as separators',
          'Parallel execution with -P: find . -name "*.png" -print0 | xargs -0 -P 4 -I {} convert {} -resize 50% {} runs 4 image conversions simultaneously, utilizing multiple CPU cores',
          'GNU parallel provides more advanced job distribution: parallel --bar convert {} -resize 50% {} ::: *.png shows a progress bar and handles complex job distribution across cores or even remote machines',
        ],
        tradeoffs: [
          'xargs is simple and universal but has limited parallelism control — GNU parallel offers job slots, progress bars, and remote execution but is an additional dependency not available by default on all systems',
          'Batching all arguments into one command (default xargs behavior) is efficient but can hit ARG_MAX limits on very large file lists — use -n to limit arguments per invocation at the cost of more process spawns',
        ],
        realWorld: [
          'Bulk formatting: find src -name "*.ts" -print0 | xargs -0 -P 4 prettier --write (parallel formatting)',
          'Batch git operations: git diff --name-only | xargs -I {} git checkout main -- {} (restore files from main)',
          'Parallel testing: find tests -name "*.test.ts" | parallel --bar npx jest {} (run test files in parallel with progress)',
        ],
      },
      {
        id: 'permissions-ownership',
        name: 'File Permissions & Ownership',
        description:
          'Unix permission model with chmod, chown, and umask — controlling who can read, write, and execute files and directories on Unix-like systems.',
        keyPoints: [
          'Numeric permissions: 755 means rwx for owner, rx for group and others — first digit is owner (4=read, 2=write, 1=execute), second is group, third is others; 644 is the standard for regular files',
          'Symbolic mode: chmod u+x adds execute for user, g-w removes write for group, o=r sets others to read-only, a+r adds read for all — more readable than numeric for single changes',
          'umask sets default permissions for new files: umask 022 creates files as 644 and directories as 755 — the mask is subtracted from 666 (files) or 777 (directories)',
          'chown user:group changes ownership — requires root for changing owner, but group changes are allowed if you belong to the target group; use -R for recursive ownership changes',
          'Special bits: SUID (4xxx) runs as file owner, SGID (2xxx) runs as file group or inherits directory group, sticky bit (1xxx) on directories prevents users from deleting others\' files (like /tmp)',
        ],
        tradeoffs: [
          'Restrictive permissions (700, 600) maximize security but complicate collaboration — group permissions and ACLs provide finer control but add complexity to permission management',
          'Running services as root simplifies permission issues but is a major security risk — creating dedicated service users with minimal permissions follows the principle of least privilege but requires more setup',
        ],
        realWorld: [
          'Fixing SSH key permissions: chmod 600 ~/.ssh/id_ed25519 && chmod 700 ~/.ssh (SSH refuses keys with loose permissions)',
          'Setting up a shared project directory: chmod 2775 /shared && chown :devteam /shared (SGID ensures new files inherit group)',
          'Making a script executable: chmod +x deploy.sh && ./deploy.sh (the execute bit is required for direct execution)',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Shell Scripting',
    part: 1,
    partTitle: 'Shell & Command Line',
    summary:
      'Write robust, maintainable shell scripts — from argument parsing and control flow to defensive scripting practices that prevent silent failures.',
    concepts: [
      {
        id: 'script-structure',
        name: 'Script Structure & Best Practices',
        description:
          'Building well-structured shell scripts with proper shebangs, argument handling, exit codes, and portability considerations.',
        keyPoints: [
          '#!/usr/bin/env bash is more portable than #!/bin/bash because it finds bash via PATH — this works on systems where bash is installed in non-standard locations (like NixOS or Homebrew on macOS)',
          'Positional arguments: $1, $2 are individual args, $@ is all args as separate words, $# is the count — use shift to pop arguments off the front when processing options in a loop',
          'Exit codes: 0 means success, 1-125 are user-defined errors, 126 is permission denied, 127 is command not found, 128+N means killed by signal N — always exit with meaningful codes',
          'getopts handles short options: while getopts "vf:o:" opt; do case $opt in v) verbose=1;; f) file="$OPTARG";; esac; done — for long options, use getopt (GNU) or manual parsing with case/shift',
          'Script portability: avoid bashisms (arrays, [[ ]]) if targeting /bin/sh, use command -v instead of which for checking command existence, and test with shellcheck for POSIX compliance warnings',
        ],
        tradeoffs: [
          'Bash-specific features ([[ ]], arrays, process substitution) are powerful but limit portability to systems with bash — targeting POSIX sh works everywhere but lacks modern conveniences',
          'Using getopts keeps argument parsing simple and standard but only supports short options — long option support requires getopt (not available everywhere) or manual case/shift parsing',
        ],
        realWorld: [
          'Writing a deployment script that accepts -e (environment), -v (verbose), and -d (dry-run) flags with getopts',
          'Creating a backup script that checks prerequisites (command -v rsync), validates arguments, and exits with specific codes for different failure modes',
          'Using $0 and dirname to resolve the script\'s own directory: SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)" for reliable path resolution',
        ],
      },
      {
        id: 'control-flow',
        name: 'Conditionals, Loops & Functions',
        description:
          'Control flow constructs in bash — if/else, for/while loops, case statements, and functions with local variables and return values.',
        keyPoints: [
          '[[ ]] is preferred over [ ] in bash: it supports && and || operators, pattern matching (=~), and doesn\'t require quoting variables to prevent word splitting — [[ -f "$file" ]] checks if a file exists',
          'for loops iterate over words: for f in *.txt; do echo "$f"; done — use while read -r line; do ... done < file for line-by-line processing (read -r prevents backslash interpretation)',
          'case statements handle pattern matching: case "$1" in start|up) start_service;; stop|down) stop_service;; *) echo "Unknown: $1";; esac — cleaner than long if/elif chains',
          'Functions use local for scoped variables: my_func() { local result; result=$(command); echo "$result"; } — without local, variables leak to the caller; return sets exit code (0-255), not a value',
          'Arrays: declare -a arr=("one" "two" "three"), access with ${arr[0]}, all elements with ${arr[@]}, length with ${#arr[@]} — iterate with for item in "${arr[@]}"; do ... done (quotes preserve elements with spaces)',
        ],
        tradeoffs: [
          'Bash functions can only return exit codes (0-255), not strings — you must use echo/printf and command substitution result=$(func) to capture output, which spawns a subshell and can be slow in tight loops',
          'while read loops are safe for line processing but slow for large files — for performance-critical processing of millions of lines, use awk or sed which are implemented in C and orders of magnitude faster',
        ],
        realWorld: [
          'Processing command output line by line: git status --porcelain | while read -r status file; do echo "$status: $file"; done',
          'Using case for a CLI command router: case "$1" in deploy) shift; deploy "$@";; test) shift; run_tests "$@";; *) usage;; esac',
          'Building a retry function: retry() { local n=$1; shift; for i in $(seq 1 "$n"); do "$@" && return 0; sleep 1; done; return 1; }',
        ],
      },
      {
        id: 'defensive-scripting',
        name: 'Defensive Scripting',
        description:
          'Techniques for writing robust shell scripts that fail loudly, clean up after themselves, and handle edge cases — set -euo pipefail, trap, and shellcheck.',
        keyPoints: [
          'set -euo pipefail: -e exits on any command failure, -u treats unset variables as errors, -o pipefail makes pipes fail if any command fails (not just the last) — put this at the top of every script',
          'trap registers cleanup handlers: trap "rm -f $tmpfile" EXIT runs on any exit (success or failure), trap "echo Error at line $LINENO" ERR runs on errors — use trap - EXIT to remove a handler',
          'shellcheck is a static analysis tool that catches common bugs: unquoted variables, unused variables, POSIX violations, and potential injection attacks — integrate it into CI and your editor',
          'Always quote variables ("$var") to prevent word splitting and glob expansion — unquoted $var splits on whitespace and expands wildcards, which is almost never what you want and can cause silent data corruption',
          'Use readonly for constants: readonly CONFIG_DIR="/etc/myapp" prevents accidental modification — combined with local readonly in functions: local -r timeout=30',
        ],
        tradeoffs: [
          'set -e catches many bugs but can cause surprising exits in conditionals (if ! command_that_fails; then is fine, but command_that_fails || handle_error is not) — understanding the exceptions requires careful study',
          'Strict mode (set -euo pipefail) breaks some common patterns like checking if a variable is set (${var:-}) or using commands that intentionally fail — you need to learn the idioms for working within strict mode',
        ],
        realWorld: [
          'Script template: #!/usr/bin/env bash\\nset -euo pipefail\\ntrap \'echo "Error at line $LINENO" >&2\' ERR',
          'Safe temporary files: tmpfile=$(mktemp) && trap "rm -f $tmpfile" EXIT — mktemp creates unique files, trap ensures cleanup',
          'CI script with shellcheck: shellcheck --severity=warning scripts/*.sh as a pre-commit hook or CI step to catch bugs before they reach production',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Git Mastery (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Git Workflow & Branching',
    part: 2,
    partTitle: 'Git Mastery',
    summary:
      'Branching strategies from trunk-based to GitFlow, interactive rebase for clean history, and worktrees for parallel development — organize your Git workflow like a pro.',
    concepts: [
      {
        id: 'branching-strategies',
        name: 'Branching Strategies',
        description:
          'Choosing the right branching model for your team — trunk-based development, GitFlow, GitHub Flow, and the ship/show/ask model.',
        keyPoints: [
          'Trunk-based development merges small changes directly to main with short-lived branches (< 1 day) — requires good CI/CD, feature flags, and trust in automated testing; used by Google, Meta, and most modern teams',
          'GitFlow uses long-lived develop, release, and hotfix branches — well-suited for versioned software with multiple releases in production, but adds overhead for web applications with continuous deployment',
          'GitHub Flow is a simplified model: main + feature branches with pull requests — merge to main triggers deployment, making it ideal for SaaS applications with a single production version',
          'Ship/show/ask categorizes changes by review need: ship (merge directly), show (merge then review), ask (PR before merge) — this trust-based model reduces bottlenecks while maintaining quality for risky changes',
          'Choose strategy based on team size, release cadence, and risk tolerance — solo developers or small teams often do trunk-based, larger teams with compliance needs may need GitFlow\'s structure',
        ],
        tradeoffs: [
          'Trunk-based development enables faster delivery and simpler merges but requires robust CI/CD and feature flags — without these, broken code reaches production quickly',
          'Long-lived branches (GitFlow) provide isolation and clear release management but lead to painful merge conflicts and integration delays — the longer a branch lives, the harder it is to merge',
        ],
        realWorld: [
          'A startup using GitHub Flow: feature branches off main, PRs with CI checks, auto-deploy on merge to main',
          'A mobile app team using GitFlow: develop branch for integration, release branches for app store submissions, hotfix branches for critical patches',
          'A team adopting ship/show/ask: config changes are shipped directly, UI updates are shown post-merge, API changes require review',
        ],
      },
      {
        id: 'interactive-rebase',
        name: 'Interactive Rebase & History Cleanup',
        description:
          'Using git rebase -i to squash, reorder, edit, and clean up commits before sharing — creating a readable, logical commit history.',
        keyPoints: [
          'git rebase -i HEAD~N opens an editor to manipulate the last N commits — pick keeps a commit, squash merges it into the previous, fixup squashes without keeping the message, reword edits just the message',
          'Autosquash workflow: commit with git commit --fixup=<sha> or --squash=<sha>, then git rebase -i --autosquash to automatically position fixup commits — enable globally with git config --global rebase.autosquash true',
          'rebase --onto transplants branches: git rebase --onto main feature-v1 feature-v2 moves feature-v2 commits (that were based on feature-v1) onto main — essential for branch chain management',
          'The edit action pauses rebase to let you amend a commit, split it into multiple commits, or add forgotten changes — use git reset HEAD~ to uncommit and re-stage selectively, then git rebase --continue',
          'Golden rule: never rebase commits that have been pushed to a shared branch — rebase rewrites history (new SHAs), which forces collaborators to reconcile diverged histories with force-push',
        ],
        tradeoffs: [
          'Clean, squashed history is easier to review and bisect but loses granular work-in-progress context — some teams prefer preserving all commits for full audit trails',
          'Rebase creates linear history which is cleaner to read, but merge commits preserve the branching topology showing when and how features were integrated — both are valid depending on team preference',
        ],
        realWorld: [
          'Cleaning up before PR: git rebase -i HEAD~5 to squash "WIP" and "fix typo" commits into logical units',
          'Using fixup workflow: make a fix, git commit --fixup=abc123, then git rebase -i --autosquash main to fold it in',
          'Splitting an oversized commit: git rebase -i, mark as edit, git reset HEAD~, then stage and commit in logical pieces',
        ],
      },
      {
        id: 'stash-worktrees',
        name: 'Stashing & Worktrees',
        description:
          'Temporarily shelving work with git stash and maintaining multiple working copies with git worktree — manage context switching without losing progress.',
        keyPoints: [
          'git stash push saves uncommitted changes (staged and unstaged) to a stack — add -m "description" for named stashes, use -u to include untracked files, and -S to stash only staged changes',
          'git stash pop applies and removes the top stash, while apply keeps it on the stack — use stash@{N} to access specific stashes, and git stash list to see all saved stashes',
          'Partial stashing with -p (patch mode) lets you interactively choose which hunks to stash — useful when you have unrelated changes mixed in your working tree and want to stash only some of them',
          'git worktree add ../feature-branch feature creates a separate working directory linked to the same repo — you can have main in one directory and a feature branch in another, both running simultaneously',
          'Worktree use cases: reviewing PRs without disrupting your current work, running tests on one branch while developing on another, or comparing behavior across branches side by side',
        ],
        tradeoffs: [
          'Stashing is quick and simple but stashes are unnamed by default and easy to forget about — over time, stash lists grow and it becomes unclear what each stash contains; always use descriptive messages',
          'Worktrees provide true parallel work but consume disk space for each checkout and can cause confusion about which directory you\'re in — they also require that no two worktrees check out the same branch',
        ],
        realWorld: [
          'Quick context switch: git stash push -m "WIP: auth feature" && git checkout hotfix-branch (stash, switch, fix, switch back, pop)',
          'PR review with worktree: git worktree add ../review-pr-42 pr-42 && cd ../review-pr-42 (review without touching your branch)',
          'Running tests on main while developing: git worktree add ../main-tests main && cd ../main-tests && npm test',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Advanced Git',
    part: 2,
    partTitle: 'Git Mastery',
    summary:
      'Debug with bisect, recover from mistakes with reflog, and automate quality with Git hooks — advanced techniques that separate Git users from Git masters.',
    concepts: [
      {
        id: 'cherry-pick-bisect',
        name: 'Cherry-pick & Bisect',
        description:
          'Selectively applying commits with cherry-pick and binary-search debugging with bisect — surgical tools for targeted changes and regression hunting.',
        keyPoints: [
          'git cherry-pick <sha> applies a specific commit to the current branch — use -x to append "(cherry picked from commit ...)" to the message for traceability, and -n (no-commit) to stage changes without committing',
          'git bisect automates binary search to find the commit that introduced a bug: mark good and bad commits, and Git checks out the midpoint — O(log n) instead of checking every commit linearly',
          'Automated bisect with run: git bisect run npm test automatically tests each midpoint commit, marking good/bad based on the test exit code — finds the culprit in minutes even across hundreds of commits',
          'Cherry-pick can create conflicts when the picked commit depends on context not present in the target branch — resolve like merge conflicts, or use -m 1 when cherry-picking merge commits to specify the parent',
          'Prefer merge or rebase over cherry-pick for regular workflow — cherry-pick creates duplicate commits with different SHAs, which can cause confusion and conflicts if branches are later merged',
        ],
        tradeoffs: [
          'Cherry-pick gives precise control over which changes go where but creates duplicate commits that Git doesn\'t track as related — if the source branch is later merged, the duplicates can cause confusing conflicts',
          'git bisect is incredibly efficient for finding regressions but requires a reliable test — if the test is flaky or the bug is intermittent, bisect can give false results; use bisect skip for untestable commits',
        ],
        realWorld: [
          'Backporting a security fix: git cherry-pick -x abc123 from main to a release branch, preserving the reference',
          'Finding a regression: git bisect start && git bisect bad HEAD && git bisect good v1.0 && git bisect run npm test',
          'Applying specific changes: git cherry-pick -n abc123 def456 (stage multiple commits without committing, then create one combined commit)',
        ],
      },
      {
        id: 'reflog-recovery',
        name: 'Reflog & Recovery',
        description:
          'Using Git\'s reflog as a safety net to recover from deleted branches, bad rebases, and accidental resets — because almost nothing in Git is truly lost.',
        keyPoints: [
          'git reflog shows all HEAD movements: commits, checkouts, rebases, resets, and merges — every action that changes HEAD is logged with timestamps and descriptions, even ones that rewrite history',
          'Recover a deleted branch: find the branch tip in git reflog, then git branch recovered-branch HEAD@{N} — this works because the commits still exist even after the branch reference is deleted',
          'Undo a bad rebase: git reflog shows the pre-rebase HEAD position, then git reset --hard HEAD@{N} to the commit before the rebase started — the original commits are still in the object database',
          'git fsck --lost-found finds dangling commits and blobs not referenced by any branch or tag — useful for recovering work from detached HEAD sessions or interrupted operations',
          'Reflog entries expire: by default, reachable entries after 90 days and unreachable after 30 days — git reflog expire can manually clean them, and git gc prunes expired dangling objects',
        ],
        tradeoffs: [
          'Reflog provides excellent local recovery but is per-repository and not shared — if you clone a repo fresh, there\'s no reflog history; it only exists on machines where the actions were performed',
          'Relying on reflog for recovery encourages confidence with Git but can lead to reckless force-pushes — reflog doesn\'t help if you force-push to a remote and a colleague pulls the rewritten history',
        ],
        realWorld: [
          'Recovering from git reset --hard: git reflog to find the lost commit, then git reset --hard HEAD@{2} to restore',
          'Finding lost work after a bad rebase: git reflog | grep "rebase" to find the pre-rebase state, then checkout or reset to that point',
          'Recovering a force-deleted branch: git reflog --all | grep "branch-name" to find the last commit on the deleted branch',
        ],
      },
      {
        id: 'git-hooks',
        name: 'Git Hooks & Automation',
        description:
          'Automating quality checks and enforcing conventions with Git hooks — from pre-commit linting to commit message validation and push protection.',
        keyPoints: [
          'Client-side hooks live in .git/hooks/: pre-commit (before commit), commit-msg (validate message), pre-push (before push), prepare-commit-msg (template the message) — they\'re shell scripts with specific exit code semantics',
          'husky manages hooks for JS projects: npx husky init creates a .husky/ directory tracked in git — hooks are shared across the team, solving the problem of .git/hooks/ not being version-controlled',
          'lint-staged runs linters only on staged files: "lint-staged": {"*.{ts,tsx}": ["eslint --fix", "prettier --write"]} — this keeps pre-commit hooks fast by avoiding linting the entire codebase',
          'commit-msg hooks enforce conventions like Conventional Commits (feat:, fix:, docs:) — tools like commitlint validate message format, enabling automated changelog generation and semantic versioning',
          'Server-side hooks (pre-receive, post-receive) run on the remote: pre-receive can reject pushes that don\'t meet criteria (no force-push to main, required CI pass), post-receive can trigger deployments',
        ],
        tradeoffs: [
          'Pre-commit hooks catch issues early but slow down the commit cycle — running full type-checking or test suites in pre-commit is annoying; limit hooks to fast checks (lint, format) and run slower checks in CI',
          'Hooks can be bypassed with --no-verify, which is sometimes necessary but undermines the safety net — team culture and CI enforcement are more reliable than client-side hooks alone',
        ],
        realWorld: [
          'husky + lint-staged setup: pre-commit runs prettier and eslint on staged files, commit-msg runs commitlint',
          'Custom pre-push hook: run tests before push to prevent CI failures: #!/bin/sh\\nnpm test || exit 1',
          'Server-side protection: GitHub branch protection rules as the server-side equivalent — require PR reviews, status checks, and linear history',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Git Collaboration',
    part: 2,
    partTitle: 'Git Mastery',
    summary:
      'Merge vs rebase strategies, conflict resolution techniques, and monorepo tooling — collaborate effectively on codebases of any size.',
    concepts: [
      {
        id: 'merge-rebase-strategies',
        name: 'Merge vs Rebase Strategies',
        description:
          'Understanding when to merge, rebase, or squash — and how each approach affects history readability, bisectability, and team collaboration.',
        keyPoints: [
          'Fast-forward merge (git merge --ff-only) moves the branch pointer without creating a merge commit — only works when the target branch has no new commits, resulting in perfectly linear history',
          'Merge commits (git merge --no-ff) always create a merge commit even when fast-forward is possible — this preserves the branch topology, showing exactly when feature branches were integrated',
          'Squash merge (git merge --squash) combines all branch commits into one staged change — you commit manually, creating a single commit on the target branch; the source branch history is discarded',
          'Rebase + merge workflow: rebase feature onto main first, then fast-forward merge — this gives linear history while preserving individual commits from the feature branch',
          'Branch protection rules enforce strategy: GitHub/GitLab can require PRs, specific merge methods, and status checks — configure "squash and merge" or "rebase and merge" as the team default',
        ],
        tradeoffs: [
          'Merge commits preserve full history and branch context but create a cluttered graph with many merge bubbles — squash merges give clean linear history but lose individual commit granularity from feature branches',
          'Requiring rebase before merge ensures linear history but forces developers to resolve conflicts against moving targets — in active repos, rebasing can become a Sisyphean task as main keeps advancing',
        ],
        realWorld: [
          'Team convention: "rebase and merge" for small PRs (< 3 commits), "squash and merge" for large feature branches with messy WIP commits',
          'Setting merge strategy in GitHub: Settings > Branches > Branch protection > "Require linear history" enforces rebase or squash merge only',
          'Auto-rebase in CI: configure Mergify or GitHub auto-merge to rebase branches automatically when they become outdated',
        ],
      },
      {
        id: 'conflict-resolution',
        name: 'Conflict Resolution Techniques',
        description:
          'Reading conflict markers, using merge tools, and applying strategies to minimize conflicts — turn merge dread into a manageable part of collaboration.',
        keyPoints: [
          'Conflict markers show both versions: <<<<<<< HEAD (yours), ======= (divider), >>>>>>> branch (theirs) — edit the file to keep the desired result, remove all markers, then git add the resolved file',
          'Merge tools provide visual diffing: git mergetool launches the configured tool (vimdiff, VS Code, IntelliJ, meld) — VS Code\'s built-in merge editor with inline accept/reject buttons is particularly intuitive',
          'git rerere (reuse recorded resolution) remembers how you resolved a conflict and automatically applies the same resolution if it occurs again — enable with git config --global rerere.enabled true',
          'ours/theirs strategies: git checkout --ours file (keep your version) or --theirs (keep their version) for entire files — git merge -X ours auto-resolves all conflicts in your favor (use with extreme caution)',
          'Prevent conflicts: keep PRs small and focused, rebase frequently against main, define clear code ownership (CODEOWNERS), and avoid reformatting entire files in feature branches',
        ],
        tradeoffs: [
          'Automatic merge strategies (ours/theirs) resolve conflicts instantly but can silently discard important changes — they\'re only safe when you\'re certain one side is completely correct',
          'rerere saves time on repeated conflicts (like during a long rebase) but can apply stale resolutions if code has changed significantly — review rerere resolutions carefully and use git rerere forget to clear bad ones',
        ],
        realWorld: [
          'Setting up VS Code as merge tool: git config --global merge.tool vscode && git config --global mergetool.vscode.cmd \'code --wait --merge $REMOTE $LOCAL $BASE $MERGED\'',
          'Resolving package-lock.json conflicts: delete the file, run npm install, then git add package-lock.json (regenerating is easier than manually merging)',
          'Using rerere for a big rebase: enable rerere, start the rebase, resolve conflicts once, and rerere replays resolutions for subsequent rebases of the same branch',
        ],
      },
      {
        id: 'monorepo-tooling',
        name: 'Monorepo Git Tooling',
        description:
          'Scaling Git for large repositories — sparse checkout, shallow clones, submodules vs subtrees, and performance tuning for monorepos with thousands of files.',
        keyPoints: [
          'Sparse checkout lets you check out only specific directories: git sparse-checkout set apps/frontend packages/ui — the rest of the repo exists in Git but isn\'t materialized on disk, saving time and space',
          'Shallow clones with --depth N only fetch the last N commits: git clone --depth 1 is fastest for CI where history isn\'t needed — use --filter=blob:none for treeless clones that fetch blobs on demand',
          'Submodules embed other Git repos as pointers: they\'re version-pinned and independently cloned — but they create nested .git directories and require explicit update commands (git submodule update --init --recursive)',
          'Subtrees merge another repo\'s history into your tree: git subtree add --prefix=lib/vendor <repo> main — simpler than submodules (no separate clone step) but pollutes your commit history with the vendored repo\'s commits',
          'Performance tuning: git config core.fsmonitor true (filesystem watcher for faster status), git commit-graph write (precomputed commit graph for faster log/merge-base), git maintenance start for background optimization',
        ],
        tradeoffs: [
          'Submodules keep repos cleanly separated but create a confusing developer experience with detached HEADs, explicit update steps, and CI complexity — subtrees are simpler to use but blend histories together',
          'Sparse checkout speeds up large monorepo workflows but can confuse tools that expect the full repo — some build systems, linters, and IDE features may break when files they expect are missing from the working tree',
        ],
        realWorld: [
          'CI optimization: git clone --depth 1 --filter=blob:none in CI pipelines to reduce clone time from minutes to seconds',
          'Monorepo sparse checkout: only checking out your team\'s apps and shared packages in a 10GB+ monorepo',
          'Enabling Git maintenance: git maintenance start sets up hourly commit-graph, daily prefetch, and weekly gc for large repos',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Automation & Productivity (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Task Automation',
    part: 3,
    partTitle: 'Automation & Productivity',
    summary:
      'Schedule tasks with cron, define build workflows with Makefiles, and watch files for changes — automate the repetitive so you can focus on the creative.',
    concepts: [
      {
        id: 'cron-timers',
        name: 'Cron & Systemd Timers',
        description:
          'Scheduling recurring tasks with cron expressions and modern systemd timers — from simple daily backups to complex multi-schedule automation.',
        keyPoints: [
          'Cron syntax: minute(0-59) hour(0-23) day(1-31) month(1-12) weekday(0-7) — "30 2 * * 1" runs at 2:30 AM every Monday, "*/5 * * * *" runs every 5 minutes, "@daily" is a convenient shorthand for "0 0 * * *"',
          'crontab -e edits your user\'s cron table, crontab -l lists entries, crontab -r removes all entries — system-wide crons go in /etc/crontab or /etc/cron.d/ with an extra user field',
          'Cron debugging: cron runs in a minimal environment without your PATH or shell config — always use full paths to commands, redirect output to a log file (>> /var/log/mycron.log 2>&1), and test commands manually first',
          'systemd timers are the modern Linux alternative: they support OnCalendar (cron-like), OnBootSec (after boot), and OnUnitActiveSec (periodic from last run) — they log to journald and can be inspected with systemctl list-timers',
          'Best practices: log all cron output, use flock to prevent overlapping runs (flock -n /tmp/myjob.lock command), set MAILTO for email alerts on failures, and version control your crontab in your dotfiles',
        ],
        tradeoffs: [
          'Cron is simple and universally available but has limited features (no dependency management, no retry logic, minimal logging) — systemd timers offer better integration and monitoring but are Linux-specific',
          'Cron\'s minimal environment prevents configuration pollution but causes frequent "works manually, fails in cron" issues — you must explicitly set PATH and source configs, adding boilerplate to every cron entry',
        ],
        realWorld: [
          'Daily database backup: 0 3 * * * /usr/bin/pg_dump mydb | gzip > /backups/mydb-$(date +\\%Y\\%m\\%d).sql.gz',
          'Preventing overlapping runs: */5 * * * * flock -n /tmp/sync.lock rsync -az /data/ remote:/backup/',
          'systemd timer for log rotation: OnCalendar=weekly with a service that rotates and compresses old log files',
        ],
      },
      {
        id: 'makefiles-runners',
        name: 'Makefiles & Task Runners',
        description:
          'Defining repeatable build and development tasks with Makefiles, just, and other task runners — a project-local command registry that every team member can use.',
        keyPoints: [
          'Makefile structure: target: prerequisites\\n\\trecipe — targets are commands (make build), prerequisites are dependencies, recipes are tab-indented shell commands; make runs the first target by default',
          '.PHONY targets declare non-file targets: .PHONY: test build clean — without this, make skips the recipe if a file named "test" or "build" exists in the directory',
          'Variables and pattern rules: CC=gcc, %.o: %.c for pattern matching — use $(shell command) to capture command output, ?= for defaults that can be overridden (PORT ?= 3000)',
          'just (justfile) is a modern alternative: simpler syntax (no tabs required), built-in argument handling, recipe-level settings, and cross-platform support — just deploy staging passes "staging" as $1 to the recipe',
          'Taskfile.yml (go-task) uses YAML: tasks are declared with cmds, deps, and vars — supports task dependencies, parallel execution, and variable interpolation with Go templates',
        ],
        tradeoffs: [
          'Makefiles are ubiquitous (pre-installed on all Unix systems) but have arcane syntax (tab sensitivity, implicit rules, shell per-line execution) — just and Taskfile have cleaner syntax but require installation',
          'Task runners centralize commands but add a layer of indirection — new team members must learn the task runner\'s conventions; a well-documented Makefile with a help target (make help) mitigates this',
        ],
        realWorld: [
          'Project Makefile: make dev (start dev server), make test (run tests), make deploy (build + push), make help (list all targets with descriptions)',
          'Self-documenting Makefile: help target that greps comments — help: @grep -E "^[a-zA-Z_-]+:.*?## " $(MAKEFILE_LIST) | sort | awk -F":.*?## " \'{printf "%-15s %s\\n", $1, $2}\'',
          'justfile with arguments: deploy env: docker build -t app . && kubectl apply -f k8s/{{env}}.yaml',
        ],
      },
      {
        id: 'file-watching',
        name: 'File Watching & Auto-Reload',
        description:
          'Triggering actions automatically when files change — from development hot-reload to production file monitoring with inotify, fswatch, and entr.',
        keyPoints: [
          'inotifywait (Linux) watches for filesystem events: inotifywait -m -r -e modify,create,delete ./src — the -m flag monitors continuously, and events can trigger rebuild commands via piping',
          'fswatch (macOS/cross-platform) monitors file changes: fswatch -o ./src | xargs -n1 -I{} make build — the -o flag outputs a count of changes, triggering the pipeline; supports regex include/exclude filters',
          'entr is the simplest file watcher: find . -name "*.ts" | entr -r npm run dev — the -r flag terminates and restarts long-running processes (servers), -c clears the screen between runs',
          'nodemon watches and restarts Node.js processes: nodemon --ext ts,json --watch src server.ts — widely used in Node.js development, configurable via nodemon.json for complex watch patterns',
          'chokidar (Node.js library) provides programmatic file watching: used internally by Vite, Webpack, and other bundlers — handles cross-platform differences (inotify on Linux, FSEvents on macOS, polling fallback)',
        ],
        tradeoffs: [
          'Polling-based watchers (checking for changes periodically) work everywhere but waste CPU — event-based watchers (inotify, FSEvents) are efficient but have platform-specific APIs and file descriptor limits',
          'Watching large directory trees (node_modules) can exhaust inotify limits on Linux — increase fs.inotify.max_user_watches, or configure watch exclusions to only monitor source directories',
        ],
        realWorld: [
          'Auto-rebuild on change: find src -name "*.ts" | entr -r npm run dev (restart dev server on TypeScript changes)',
          'Auto-test on save: find tests -name "*.test.ts" | entr npm test (run tests whenever test files change)',
          'Production monitoring: inotifywait -m /etc/nginx/ -e modify | while read; do nginx -t && nginx -s reload; done',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'SSH & Remote Operations',
    part: 3,
    partTitle: 'Automation & Productivity',
    summary:
      'SSH configuration, tunneling, and remote execution — securely connect to and manage remote machines like a power user.',
    concepts: [
      {
        id: 'ssh-config',
        name: 'SSH Config & Key Management',
        description:
          'Streamlining SSH connections with ~/.ssh/config, managing keys securely with ssh-agent, and hardening SSH access — the foundation of remote work.',
        keyPoints: [
          '~/.ssh/config defines host aliases: Host myserver\\n  HostName 192.168.1.100\\n  User deploy\\n  IdentityFile ~/.ssh/deploy_key — then just ssh myserver instead of typing full connection details every time',
          'Ed25519 keys are recommended: ssh-keygen -t ed25519 -C "email@example.com" — they\'re shorter, faster, and more secure than RSA; the -C flag adds a comment to identify the key',
          'ssh-agent caches key passphrases in memory: eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519 — add AddKeysToAgent yes in config to auto-add keys on first use without manual ssh-add',
          'Agent forwarding (ForwardAgent yes) lets you use your local SSH keys on remote servers — useful for git operations on remote machines, but risky on untrusted servers where admins could hijack your agent socket',
          'Security hardening: disable password auth (PasswordAuthentication no), disable root login (PermitRootLogin no), change the default port, use fail2ban for brute-force protection, and limit access with AllowUsers',
        ],
        tradeoffs: [
          'Agent forwarding is convenient for multi-hop SSH and remote git operations but exposes your keys to the remote server\'s admin — ProxyJump (-J) is a safer alternative that routes traffic through the jump host without forwarding the agent',
          'Using one SSH key for everything is simple but means a single compromised key grants access to all systems — separate keys per use case (work, personal, deploy) limit the blast radius of compromise',
        ],
        realWorld: [
          'SSH config with jump host: Host internal\\n  HostName 10.0.0.5\\n  ProxyJump bastion\\n  User admin (connect to internal server via bastion)',
          'GitHub deploy keys: create a read-only key per repo for CI servers instead of using a personal access token with broad permissions',
          'ssh-agent on macOS: add UseKeychain yes and AddKeysToAgent yes to ~/.ssh/config so passphrases persist across reboots via Keychain',
        ],
      },
      {
        id: 'ssh-tunneling',
        name: 'SSH Tunneling & Port Forwarding',
        description:
          'Creating encrypted tunnels with SSH for local and remote port forwarding — securely access remote services, expose local services, and create SOCKS proxies.',
        keyPoints: [
          'Local forwarding (-L) makes a remote service accessible locally: ssh -L 5432:localhost:5432 dbserver forwards remote PostgreSQL to local port 5432 — you connect to localhost:5432 and traffic tunnels to the remote database',
          'Remote forwarding (-R) exposes a local service on the remote machine: ssh -R 8080:localhost:3000 server makes your local dev server (port 3000) accessible at server:8080 — useful for demos and webhooks',
          'Dynamic forwarding (-D) creates a SOCKS proxy: ssh -D 1080 server — configure your browser or application to use localhost:1080 as a SOCKS5 proxy to route all traffic through the remote server',
          'Jump hosts (ProxyJump) chain connections: ssh -J bastion internal connects to internal through bastion without port forwarding — cleaner than manual tunnel setup and works with config file entries',
          'Persistent tunnels with autossh: autossh -M 0 -f -N -L 5432:localhost:5432 dbserver maintains the tunnel and reconnects on failure — the -M 0 flag uses SSH\'s built-in keepalive instead of a monitor port',
        ],
        tradeoffs: [
          'SSH tunnels provide encryption without VPN infrastructure but are per-port and per-session — VPNs provide network-level access to all services but require more setup and have broader security implications',
          'Keeping long-lived tunnels (autossh, -f -N) running is convenient but creates persistent network paths that may bypass firewall policies — audit tunnels regularly and close them when not needed',
        ],
        realWorld: [
          'Accessing a remote database: ssh -L 5432:rds-instance.internal:5432 bastion — then connect via psql -h localhost -p 5432',
          'Sharing local development: ssh -R 80:localhost:3000 tunnel.example.com to expose your dev server for teammate testing',
          'Tunnel in SSH config: Host db-tunnel\\n  HostName bastion\\n  LocalForward 5432 db.internal:5432\\n  ServerAliveInterval 30',
        ],
      },
      {
        id: 'remote-execution',
        name: 'Remote Execution & File Transfer',
        description:
          'Running commands on remote machines, syncing files with rsync, and managing remote sessions — the tools for operating infrastructure from your terminal.',
        keyPoints: [
          'Single command execution: ssh server "ls -la /var/log" runs the command remotely and returns output locally — quote the command to prevent local shell expansion; use -t for commands that need a TTY (interactive editors, sudo)',
          'rsync syncs files efficiently: rsync -avz --delete src/ server:/dest/ — only transfers changed parts of files (delta transfer), -a preserves permissions/timestamps, -z compresses, --delete removes extras on destination',
          'scp for simple one-off copies: scp file.txt server:/tmp/ or scp -r dir/ server:/tmp/ — simpler than rsync but no delta transfer, no resume on failure, and SSH tunneling config must be duplicated',
          'Remote scripts with heredoc: ssh server bash <<\'EOF\'\\ncd /app && git pull && npm install && pm2 restart all\\nEOF — the single-quoted heredoc prevents local variable expansion',
          'Parallel remote execution: tools like pdsh (pdsh -w "server[1-10]" "uptime") or ansible ad-hoc (ansible all -m shell -a "df -h") run commands across multiple servers simultaneously',
        ],
        tradeoffs: [
          'rsync is powerful and efficient but has complex flag combinations and trailing-slash semantics (src/ vs src) that catch people off guard — the trailing slash determines whether to copy the directory or its contents',
          'Running commands via ssh is quick for one-off operations but doesn\'t scale — for managing more than a handful of servers, configuration management tools (Ansible, Puppet) provide idempotency, rollback, and audit trails',
        ],
        realWorld: [
          'Deploying with rsync: rsync -avz --exclude node_modules --exclude .git ./ server:/app/ (sync project, excluding unneeded files)',
          'Remote log inspection: ssh server "tail -f /var/log/app.log" | grep --line-buffered "ERROR" (stream remote logs with local filtering)',
          'Multi-server status: pdsh -w "web[01-05]" "systemctl status nginx" | dshbak -c (grouped output from 5 web servers)',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Environment Management',
    part: 3,
    partTitle: 'Automation & Productivity',
    summary:
      'Version managers, dotfiles strategies, and containerized development environments — keep your setup reproducible and portable across machines.',
    concepts: [
      {
        id: 'version-managers',
        name: 'Version Managers',
        description:
          'Managing multiple versions of programming languages and tools — nvm, pyenv, rustup, and the universal mise/asdf for seamless per-project version switching.',
        keyPoints: [
          'nvm (Node Version Manager) and the faster fnm (Rust-based) switch Node.js versions: nvm install 20 && nvm use 20 — .nvmrc files in project roots enable automatic switching with nvm use or fnm\'s auto-detection',
          'pyenv manages Python versions independently of the system Python: pyenv install 3.12.0 && pyenv local 3.12.0 — the local command creates a .python-version file for per-directory auto-switching',
          'mise (formerly rtx) and asdf are universal version managers: .tool-versions specifies versions for all tools in one file — mise is faster (Rust-based) and compatible with asdf plugins, reducing tool sprawl',
          'Shims vs PATH manipulation: asdf/mise use shims (lightweight wrappers that redirect to the correct version), while nvm modifies PATH on each shell session — shims are faster for shell startup but add a layer of indirection',
          'Auto-switching on directory change: configure your shell to detect version files when you cd — fnm and mise do this natively, nvm requires a shell hook (add to .zshrc: autoload -U add-zsh-hook; add-zsh-hook chdir load-nvmrc)',
        ],
        tradeoffs: [
          'Language-specific managers (nvm, pyenv, rustup) are well-maintained and deeply integrated but require separate tools for each language — universal managers (mise, asdf) reduce tool count but may lag behind on features or version availability',
          'Shim-based tools (asdf, mise) have negligible shell startup cost but add ~5-10ms overhead per command invocation — PATH-based tools (nvm) have slower shell startup but zero runtime overhead once activated',
        ],
        realWorld: [
          'Project setup with mise: mise use node@20 python@3.12 in a project root creates .tool-versions — teammates install mise and get matching versions automatically',
          'CI version pinning: .nvmrc or .tool-versions in the repo root ensures CI uses the same versions as local development',
          'Migrating from nvm to fnm: fnm is a drop-in replacement that reads .nvmrc and is 10x faster at shell startup due to Rust implementation',
        ],
      },
      {
        id: 'dotfiles',
        name: 'Dotfiles Management',
        description:
          'Version controlling and synchronizing your shell configuration, editor settings, and tool configs across machines — strategies from simple git repos to templated solutions.',
        keyPoints: [
          'Bare git repo strategy: git init --bare $HOME/.dotfiles, alias dotfiles="git --git-dir=$HOME/.dotfiles --work-tree=$HOME" — track files in $HOME without cluttering it with a .git directory',
          'GNU stow manages symlinks: stow -d ~/dotfiles -t ~ zsh vim git creates symlinks from ~/dotfiles/zsh/.zshrc to ~/.zshrc — each tool\'s config lives in its own directory for clean organization',
          'chezmoi adds templating and encryption: chezmoi edit ~/.zshrc opens a template that can include machine-specific logic ({{if eq .chezmoi.os "darwin"}}) and encrypted secrets (chezmoi encrypt)',
          'Organization pattern: group dotfiles by tool (zsh/, vim/, git/, tmux/) with an install script that detects the OS and sets up symlinks, packages, and dependencies — include a README for bootstrapping steps',
          'Secrets management: never commit plaintext secrets — use git-crypt to transparently encrypt specific files, age for standalone encryption, or template secrets that are filled in during setup (chezmoi or envsubst)',
        ],
        tradeoffs: [
          'A bare git repo is zero-dependency and works everywhere but has no templating — machine-specific differences require branching or conditional logic in shell configs instead of clean template variables',
          'chezmoi handles templating, encryption, and multi-machine differences elegantly but is a non-trivial tool to learn — for simple setups (one machine, no secrets), stow or a bare repo is simpler and sufficient',
        ],
        realWorld: [
          'Bootstrapping a new Mac: clone dotfiles repo, run install.sh that uses stow and Homebrew bundle to set up everything in one command',
          'Using chezmoi with 1Password: chezmoi templates pull secrets from 1Password CLI at apply time, keeping secrets out of the git repo entirely',
          'Dotfiles CI: a GitHub Action that tests your install script in a fresh Ubuntu container to ensure the bootstrap process works for new machines',
        ],
      },
      {
        id: 'dev-containers',
        name: 'Docker for Dev Environments',
        description:
          'Using Docker and devcontainers for reproducible, isolated development environments — ensuring every developer has identical tooling regardless of their host OS.',
        keyPoints: [
          'Dockerfile defines the dev environment: install languages, tools, and configs in a reproducible image — multi-stage builds keep the final image small by separating build dependencies from the runtime',
          'docker-compose orchestrates multi-service setups: app, database, cache, and message queue defined in one YAML file — docker compose up starts everything with configured networking and volumes',
          'VS Code devcontainers (.devcontainer/devcontainer.json) open your project inside a Docker container with all extensions and settings pre-configured — the developer experience is seamless, as if working locally',
          'Bind mounts for live development: mount your source code into the container (-v $(pwd):/app) so file changes are reflected immediately without rebuilding — combine with file watchers for hot reload',
          'Devcontainer features add tools declaratively: "features": {"ghcr.io/devcontainers/features/node:1": {}} installs Node.js without Dockerfile changes — composable building blocks for dev environments',
        ],
        tradeoffs: [
          'Devcontainers ensure consistency but add Docker overhead (startup time, resource usage, filesystem performance on macOS) — for simple projects, native development is faster and simpler',
          'Bind mounts provide live editing but suffer from filesystem performance issues on macOS Docker (5-10x slower I/O) — named volumes are faster but don\'t sync with the host filesystem for editor access',
        ],
        realWorld: [
          'Team onboarding: new developer clones the repo, opens in VS Code, clicks "Reopen in Container" and has a working environment in minutes',
          'GitHub Codespaces: .devcontainer.json configures cloud dev environments that match local containers — one-click development from a browser',
          'docker compose for microservices: docker compose up starts the API, frontend, PostgreSQL, and Redis with pre-seeded data for local development',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Advanced Developer Tools (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Terminal Multiplexing & Workflow',
    part: 4,
    partTitle: 'Advanced Developer Tools',
    summary:
      'tmux for session management, terminal customization with modern prompts, and fzf for fuzzy finding everything — build an efficient terminal workflow.',
    concepts: [
      {
        id: 'tmux',
        name: 'tmux Sessions, Windows & Panes',
        description:
          'Managing persistent terminal sessions with tmux — sessions survive disconnections, windows organize workspaces, and panes split your view.',
        keyPoints: [
          'Sessions persist across disconnections: tmux new -s project creates a named session, Ctrl-b d detaches, tmux attach -t project re-attaches — essential for SSH work where connections drop',
          'Windows are like tabs: Ctrl-b c creates a new window, Ctrl-b n/p switches next/previous, Ctrl-b [0-9] jumps to numbered windows — organize by task (editor, server, logs)',
          'Panes split the current window: Ctrl-b % splits vertically, Ctrl-b " splits horizontally, Ctrl-b arrow keys navigate between panes — Ctrl-b z zooms a pane to full screen and back',
          'Customize in ~/.tmux.conf: rebind prefix (set -g prefix C-a), enable mouse mode (set -g mouse on), set vi keybindings (setw -g mode-keys vi), and adjust pane navigation to vim-style (h,j,k,l)',
          'Plugins with tpm (Tmux Plugin Manager): tmux-resurrect saves/restores sessions across reboots, tmux-continuum auto-saves every 15 minutes, tmux-sensible provides reasonable defaults',
        ],
        tradeoffs: [
          'tmux provides persistent sessions and powerful multiplexing but has a steep learning curve with its keybinding system — modern terminal emulators (Kitty, WezTerm) offer native splits and tabs that are easier to learn',
          'Running everything in tmux means your workflow survives SSH disconnections but adds memory overhead per session — for local-only work, native terminal tabs may be simpler and lighter',
        ],
        realWorld: [
          'Development layout: tmux session with windows for editor (vim), server (npm run dev), logs (tail -f), and git operations',
          'SSH resilience: start a long-running deployment in tmux on the server — if your connection drops, tmux attach recovers the session',
          'tmux scripting: a project-start script that creates a named session, splits panes, and runs commands in each pane (tmuxinator or manual tmux send-keys)',
        ],
      },
      {
        id: 'terminal-customization',
        name: 'Terminal Customization',
        description:
          'Modern shell prompts, shell frameworks, and terminal emulators — crafting a terminal environment that is both informative and fast.',
        keyPoints: [
          'Starship is a cross-shell prompt: written in Rust, shows git branch/status, language versions, command duration, and errors — configured via starship.toml and works with bash, zsh, fish, and PowerShell',
          'oh-my-zsh provides a plugin/theme framework for zsh but can slow startup significantly — consider lazy loading plugins, using lighter alternatives (prezto, zinit), or plain zsh with manual plugin sourcing',
          'fish shell has built-in features that zsh needs plugins for: autosuggestions, syntax highlighting, and web-based configuration — the tradeoff is non-POSIX syntax that breaks bash script compatibility',
          'Modern terminal emulators: Alacritty (GPU-accelerated, minimal), WezTerm (Lua config, multiplexer built-in), Kitty (GPU-rendered, image support) — all significantly faster than Terminal.app or iTerm2 for heavy output',
          'Shell startup optimization: measure with time zsh -i -c exit, identify slow plugins, lazy-load heavy tools (nvm, pyenv), and use zinit or sheldon for parallel plugin loading — target under 100ms startup',
        ],
        tradeoffs: [
          'Rich prompts (Starship, Powerlevel10k) show useful context at a glance but add latency to each prompt render — Starship mitigates this with async rendering, but complex configurations can still feel sluggish on slow filesystems',
          'Shell frameworks (oh-my-zsh) provide a curated experience with easy plugin management but bundle features you don\'t need — a hand-crafted config loads only what you use and starts faster, but requires more maintenance',
        ],
        realWorld: [
          'Starship config: [git_status] showing ahead/behind counts, [nodejs] showing version, [cmd_duration] showing execution time for long commands',
          'Measuring startup: for i in $(seq 1 10); do time zsh -i -c exit; done — average the results to identify if startup exceeds 200ms',
          'Lazy-loading nvm: replace nvm initialization with a function that loads nvm on first use — cuts 200-500ms from shell startup',
        ],
      },
      {
        id: 'fzf-fuzzy',
        name: 'Fuzzy Finding with fzf',
        description:
          'Using fzf as a universal fuzzy finder for files, command history, git operations, and any list-based selection — turning tedious browsing into instant search.',
        keyPoints: [
          'fzf reads from stdin and presents an interactive fuzzy finder: find . -type f | fzf pipes file paths into fzf for selection — the selected item is written to stdout for use in other commands',
          'Shell integration adds default keybindings: Ctrl-T inserts a selected file path, Ctrl-R fuzzy-searches command history (replacing the default reverse search), Alt-C cd\'s into a selected directory',
          'Git integration: git branch | fzf for branch switching, git log --oneline | fzf --preview "git show {1}" for commit browsing, git stash list | fzf for stash selection — any git list becomes navigable',
          'Custom commands with preview: fzf --preview "bat --color=always {}" shows syntax-highlighted file previews while browsing — combine with --bind for keyboard actions (ctrl-d:preview-page-down)',
          'fzf as a universal pattern: wrap any list in fzf for interactive selection — docker ps | fzf for container selection, ps aux | fzf for process killing, npm scripts via jq + fzf for script running',
        ],
        tradeoffs: [
          'fzf makes every list-selection task interactive and fast but adds a dependency — scripts using fzf won\'t work in environments where it\'s not installed; always provide non-interactive fallbacks for automation',
          'Fuzzy matching can surface unexpected results when the search term is ambiguous — exact matching (fzf -e) or prefix matching (^pattern) gives more precise results when you know what you\'re looking for',
        ],
        realWorld: [
          'Git branch switcher: alias gcb=\'git checkout $(git branch | fzf --height 40% --reverse)\' — interactive branch selection in one keystroke',
          'Kill process: alias fkill=\'kill -9 $(ps aux | fzf | awk \"{print \\$2}\")\' — fuzzy find and kill a process',
          'Open file in editor: vim $(fzf --preview "bat --color=always {}") — browse and preview files before opening',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Debugging & System Analysis',
    part: 4,
    partTitle: 'Advanced Developer Tools',
    summary:
      'Process management, network debugging, and system resource analysis — diagnose and troubleshoot issues at the OS level.',
    concepts: [
      {
        id: 'process-management',
        name: 'Process Management',
        description:
          'Finding, monitoring, and controlling processes — from ps and top for observation to kill signals and job control for management.',
        keyPoints: [
          'ps aux lists all processes with details (user, PID, CPU%, MEM%, command) — use pgrep -f "pattern" to find processes by name, and pgrep -la for listing matches with full command lines',
          'top shows real-time process activity, but htop/btop are vastly better: color-coded, mouse-support, tree view, filtering, and per-CPU/memory graphs — install htop as your first tool on any new system',
          'Kill signals: SIGTERM (15, graceful shutdown, default), SIGKILL (9, force kill, cannot be caught), SIGHUP (1, hangup/reload config), SIGSTOP/SIGCONT (pause/resume) — always try SIGTERM before SIGKILL',
          'Job control: Ctrl-Z suspends the foreground process, bg resumes it in background, fg brings it to foreground, jobs lists background jobs — nohup command & runs a command immune to hangup signals',
          'Process priority: nice -n 10 command starts with lower priority (higher nice value = less CPU priority), renice -n -5 -p PID adjusts a running process — useful for long-running tasks that shouldn\'t impact interactive performance',
        ],
        tradeoffs: [
          'SIGKILL guarantees process termination but prevents cleanup (temp files, locks, database connections left open) — always try SIGTERM first and wait a few seconds before resorting to SIGKILL',
          'Background jobs (&, nohup) keep processes running after logout but can be forgotten about — use a process manager (systemd, pm2, supervisor) for long-running services that need monitoring and auto-restart',
        ],
        realWorld: [
          'Finding what\'s using port 3000: lsof -i :3000 or ss -tlnp | grep 3000 — then kill the PID if needed',
          'Running a long build in background: nohup npm run build > build.log 2>&1 & disown (survives terminal close)',
          'Monitoring a specific process: htop -p $(pgrep -d, node) shows only Node.js processes with real-time CPU/memory',
        ],
      },
      {
        id: 'network-debugging',
        name: 'Network Debugging',
        description:
          'Diagnosing network issues with curl, netcat, ss/lsof, and DNS tools — from HTTP request testing to port scanning and packet analysis.',
        keyPoints: [
          'curl is the Swiss Army knife of HTTP: -I (headers only), -X POST -d "data" (POST request), -H "Auth: Bearer token" (custom headers), -w "%{time_total}" (timing), -v (verbose with TLS details)',
          'netcat (nc) tests raw TCP/UDP: nc -zv host 80 checks if a port is open, nc -l 8080 listens on a port — useful for testing connectivity when HTTP tools are overkill or the protocol isn\'t HTTP',
          'ss (modern replacement for netstat) shows socket statistics: ss -tlnp lists listening TCP ports with process names, ss -s shows a summary of all connections — faster and more informative than netstat',
          'DNS debugging: dig domain.com shows full DNS resolution, dig +short for just the IP, dig @8.8.8.8 to query specific DNS servers — nslookup is simpler but dig provides more detail (TTL, authoritative server)',
          'mtr (My Traceroute) combines ping and traceroute: mtr --report google.com shows packet loss and latency at each hop — essential for diagnosing "the network is slow" complaints with data',
        ],
        tradeoffs: [
          'curl is incredibly versatile but its flag syntax can be opaque — httpie (http) provides a more readable syntax for HTTP requests (http POST api.com name=value) but is an additional dependency',
          'tcpdump and Wireshark capture raw packets for deep analysis but require root access and generate enormous amounts of data — use targeted filters (tcpdump -i any port 443) and capture only what\'s needed',
        ],
        realWorld: [
          'Testing an API endpoint: curl -s -w "\\nTime: %{time_total}s\\n" -H "Content-Type: application/json" -d \'{"key":"value"}\' https://api.example.com/endpoint',
          'Checking if a port is accessible through a firewall: nc -zv -w5 server 5432 (5-second timeout)',
          'Diagnosing slow DNS: dig +trace domain.com to see the full resolution chain from root servers to authoritative nameserver',
        ],
      },
      {
        id: 'disk-memory',
        name: 'Disk & Memory Analysis',
        description:
          'Monitoring disk usage, memory consumption, and I/O performance — the tools for answering "why is the server full/slow?" questions.',
        keyPoints: [
          'du shows directory sizes: du -sh * for a summary of each item in the current directory, du -sh --max-depth=1 / for top-level directories — sort results with du -sh * | sort -h for human-readable sorted output',
          'df shows filesystem usage: df -h for human-readable sizes, df -i for inode usage (you can run out of inodes before disk space on filesystems with many small files) — check both when "disk full" errors appear',
          'ncdu is an interactive disk usage analyzer: ncdu / scans and presents a navigable tree sorted by size — press d to delete large files directly, much faster than manually running du in each directory',
          'free -h shows memory: total, used, free, and available (which accounts for cache that can be reclaimed) — "available" is the real indicator of usable memory, not "free" which excludes reclaimable cache',
          'lsof lists open files and the processes using them: lsof +D /var/log shows who\'s writing to log files, lsof -i shows network connections — combine with grep for targeted analysis',
        ],
        tradeoffs: [
          'du scans directories in real-time which can be slow on large filesystems with millions of files — ncdu caches the scan results for fast navigation but shows a point-in-time snapshot that becomes stale',
          'Monitoring tools (htop, iotop, ncdu) are invaluable for diagnosis but installing them on production servers may conflict with security policies — some teams maintain a "debug tools" package that can be temporarily installed',
        ],
        realWorld: [
          'Finding what\'s filling the disk: ncdu / then navigate to the largest directories — common culprits: /var/log, /tmp, Docker images, node_modules',
          'Checking memory pressure: free -h and looking at "available" column — if available is < 10% of total, investigate with ps aux --sort=-%mem | head',
          'Tracking disk I/O: iotop -oP shows only processes doing active I/O with their read/write rates — useful for identifying which process is thrashing the disk',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'CLI Tool Building & One-Liners',
    part: 4,
    partTitle: 'Advanced Developer Tools',
    summary:
      'Craft powerful one-liners, master regex for search-and-replace, and build your own CLI tools — become the developer others ask for help.',
    concepts: [
      {
        id: 'one-liners',
        name: 'Bash & Python One-Liners',
        description:
          'Solving common tasks with concise command-line expressions — from counting and sorting to data transformation and quick calculations.',
        keyPoints: [
          'Frequency counting: sort | uniq -c | sort -rn is the universal pattern for "what appears most?" — works on any line-delimited input (log entries, error codes, IP addresses)',
          'python -c enables quick calculations and text processing: python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), indent=2))" pretty-prints JSON — useful when jq isn\'t available',
          'Perl one-liners handle complex text manipulation: perl -pe "s/pattern/replacement/g" for regex replacement across stdin, perl -ne "print if /pattern/" for filtering — Perl\'s regex is more powerful than sed\'s',
          'Data pipeline pattern: command | filter | transform | aggregate — e.g., cat access.log | grep "POST" | awk \'{print $7}\' | sort | uniq -c | sort -rn (most-POSTed endpoints)',
          'Benchmarking: time command measures wall/user/sys time, hyperfine "command1" "command2" provides statistical comparison with warmup runs — essential for proving that an optimization actually helps',
        ],
        tradeoffs: [
          'One-liners are fast to write and execute but unreadable when they grow — if a one-liner exceeds 80 characters or uses more than 3 pipes, extract it into a named script for clarity and reusability',
          'Shell one-liners work on any Unix system without dependencies but are limited by each tool\'s capabilities — Python/Perl one-liners are more powerful but require the interpreter to be installed and are harder to compose with pipes',
        ],
        realWorld: [
          'Count lines of code by extension: find . -name "*.ts" -print0 | xargs -0 wc -l | tail -1 (total TypeScript lines)',
          'Find duplicate files by content: find . -type f -exec md5sum {} + | sort | uniq -d -w 32 (files with matching MD5)',
          'Convert timestamps: while read ts; do date -d @"$ts"; done < timestamps.txt (convert Unix timestamps to readable dates)',
        ],
      },
      {
        id: 'regex-mastery',
        name: 'Regex for Search & Replace',
        description:
          'Regular expression fundamentals from character classes to lookahead assertions — mastering the pattern language that powers search-and-replace across every developer tool.',
        keyPoints: [
          'Character classes: [a-z] (lowercase), \\d (digit), \\w (word char), \\s (whitespace), . (any char) — negate with [^a-z] or \\D; quantifiers: * (0+), + (1+), ? (0-1), {n,m} (n to m times)',
          'Capturing groups (...) save matched text for backreferences: sed "s/\\(\\w+\\)=\\(.*\\)/\\2 -> \\1/" swaps key=value — in modern tools, use \\1, \\2 or $1, $2 for references',
          'Lookahead (?=...) and lookbehind (?<=...) match without consuming: \\d+(?= dollars) matches numbers followed by " dollars" without including " dollars" in the match — requires PCRE (grep -P or Perl)',
          'Regex differs across tools: grep uses BRE by default (escape +, ?, |), grep -E uses ERE, grep -P uses PCRE — sed uses BRE, awk uses ERE, and VS Code uses JavaScript regex with some extensions',
          'Common patterns: ^[\\w.+-]+@[\\w-]+\\.[\\w.]+$ (email), \\b\\d{1,3}(\\.\\d{1,3}){3}\\b (IPv4), https?://[\\w./\\-?=&#]+ (URL), \\bv?\\d+\\.\\d+\\.\\d+\\b (semver) — always test on regex101.com before using in production',
        ],
        tradeoffs: [
          'Regex is incredibly powerful for pattern matching but can become unreadable and unmaintainable — the famous quote "now you have two problems" applies; for complex parsing, use a proper parser library instead',
          'Greedy quantifiers (.*, .+) match as much as possible which often over-matches — use lazy quantifiers (.*?, .+?) or more specific character classes ([^"]*) to match only what you intend',
        ],
        realWorld: [
          'VS Code search-and-replace: find console\\.log\\((.*)\\) replace with logger.debug($1) across the project',
          'Validating input: grep -P "^\\d{4}-\\d{2}-\\d{2}$" dates.txt filters valid YYYY-MM-DD dates',
          'Extracting data: grep -oP "(?<=version\": \")\\d+\\.\\d+\\.\\d+" package.json extracts the version number using lookbehind',
        ],
      },
      {
        id: 'cli-tools',
        name: 'Building Your Own CLI Tools',
        description:
          'Creating reusable command-line tools from aliases and functions to standalone scripts and packaged CLI applications — extending your terminal with custom commands.',
        keyPoints: [
          'Shell aliases are the quickest custom commands: alias gs="git status", alias ll="ls -lah", alias dc="docker compose" — add to .zshrc/.bashrc for persistence; use unalias to remove, and type to check if a command is aliased',
          'Shell functions handle arguments and logic: mkcd() { mkdir -p "$1" && cd "$1"; } — functions are more powerful than aliases because they accept arguments at any position and support control flow',
          'Python CLI with click/typer: typer auto-generates help text, argument parsing, and tab completion from type hints — @app.command() decorators define subcommands, making it easy to build complex CLIs',
          'Make your scripts available: add a personal bin directory to PATH (export PATH="$HOME/.local/bin:$PATH"), symlink or copy scripts there — use chmod +x and proper shebangs for direct execution',
          'Tab completion: bash-completion provides framework for custom completions, zsh\'s compdef/_function system offers more power — register completions for your custom commands so users can tab-complete arguments',
        ],
        tradeoffs: [
          'Shell aliases and functions are instant to create but are shell-specific and not shareable — a proper script in PATH works in any shell and can be distributed to teammates, but requires more setup',
          'Python/Node CLI tools (typer, commander) produce polished CLIs with help text and validation but require runtime dependencies — compiled tools (Go, Rust with clap) have zero dependencies but longer development cycles',
        ],
        realWorld: [
          'Project navigator: proj() { cd ~/projects/"$1" || echo "Not found"; } with completion: _proj() { _files -W ~/projects; }; compdef _proj proj',
          'Quick HTTP server: alias serve="python3 -m http.server 8000" — instantly serve the current directory for file sharing or testing',
          'Custom git workflow: a "git sync" alias/function that stashes changes, pulls with rebase, pops stash, and pushes — wrapping multi-step workflows into single commands',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
