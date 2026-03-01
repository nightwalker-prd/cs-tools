export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ===== Part 1: Shell & Command Line =====

  // --- Topic 1: Bash Fundamentals ---
  {
    id: "t1-q1",
    chapterId: 1,
    question: "What is the difference between .bashrc and .bash_profile?",
    options: [
      ".bashrc is for login shells, .bash_profile is for non-login shells",
      ".bash_profile is sourced by login shells, .bashrc by interactive non-login shells",
      "They are identical — both are sourced on every shell startup",
      ".bash_profile is macOS-only, .bashrc is Linux-only",
    ],
    answer: 1,
    explanation:
      ".bash_profile (or .profile) is sourced by login shells (SSH, terminal login), while .bashrc is sourced by interactive non-login shells (opening a new terminal tab). On macOS, Terminal.app opens login shells by default, which is why many macOS users only have .bash_profile.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      'What does the command `export MY_VAR="hello"` do differently from `MY_VAR="hello"`?',
    options: [
      "export makes the variable persistent across reboots",
      "export makes the variable available to child processes spawned from the current shell",
      "export writes the variable to /etc/environment",
      "There is no difference — both set environment variables identically",
    ],
    answer: 1,
    explanation:
      "Without export, a variable is a shell variable only visible in the current shell session. Using export promotes it to an environment variable, which is inherited by any child processes (subshells, scripts, commands) launched from that shell. Neither form persists across reboots without being added to a startup file.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "In Bash, what is the difference between `cmd1 && cmd2` and `cmd1 ; cmd2`?",
    options: [
      "&& runs both commands in parallel, ; runs them sequentially",
      "&& runs cmd2 only if cmd1 succeeds (exit code 0), ; runs cmd2 regardless",
      "; runs cmd2 only if cmd1 fails, && runs cmd2 only if cmd1 succeeds",
      "There is no practical difference — both execute commands sequentially",
    ],
    answer: 1,
    explanation:
      "The && operator is a short-circuit AND — it only executes the second command if the first exits with status 0 (success). The semicolon (;) is a simple command separator that runs commands sequentially regardless of exit status. This makes && essential for build scripts where you want to stop on failure, e.g., `make && make install`.",
  },

  // --- Topic 2: Text Processing ---
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "What advantage does ripgrep (rg) have over traditional grep for searching code repositories?",
    options: [
      "ripgrep uses a different regex engine that supports more syntax",
      "ripgrep automatically respects .gitignore rules and skips binary files, making it faster for code searches",
      "ripgrep can only search one file at a time but does so more thoroughly",
      "ripgrep is written in Python, making it more portable than grep",
    ],
    answer: 1,
    explanation:
      "ripgrep is designed for searching code and automatically respects .gitignore, skips hidden files and binary files, and uses parallel directory traversal. These defaults make it significantly faster for typical code searches without requiring extra flags. It also uses Rust's regex engine which is very fast.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "Which sed command correctly replaces all occurrences of 'http' with 'https' in a file in-place?",
    options: [
      "sed 's/http/https/' file.txt",
      "sed -i '' 's/http/https/g' file.txt",
      "sed -r 'http/https' file.txt",
      "sed --replace 'http' 'https' file.txt",
    ],
    answer: 1,
    explanation:
      "The -i flag enables in-place editing (on macOS/BSD, -i '' is required; on GNU/Linux, -i alone works). The 's/old/new/g' syntax is a substitution command where the 'g' flag means global — replace all occurrences on each line, not just the first. Without 'g', only the first match per line is replaced.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      'Given a JSON file, what does `jq \'.users[] | select(.active == true) | .name\'` do?',
    options: [
      "Selects all users and sets their active field to true",
      "Iterates over the users array, filters for active users, and extracts their names",
      "Creates a new JSON file with only active users",
      "Counts the number of active users and returns the total",
    ],
    answer: 1,
    explanation:
      "This jq pipeline first iterates over each element in the .users array with [], then filters elements where the .active field equals true using select(), and finally extracts just the .name field from each matching object. jq pipelines work similarly to Unix pipes, passing output from one filter to the next.",
  },

  // --- Topic 3: File & Directory Operations ---
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "What does the command `find . -name '*.log' -mtime +30 -delete` do?",
    options: [
      "Finds and lists all .log files modified in the last 30 minutes",
      "Finds and deletes all .log files that were last modified more than 30 days ago",
      "Finds all .log files and moves them to a directory named '+30'",
      "Finds .log files larger than 30 MB and deletes them",
    ],
    answer: 1,
    explanation:
      "The find command searches recursively from the current directory (.) for files matching the glob *.log that were last modified more than 30 days ago (-mtime +30). The -delete action removes each matching file. This is a common pattern for cleaning up old log files. The + prefix means 'more than', while - would mean 'less than'.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "What does `xargs` do, and why is it useful with commands like `find`?",
    options: [
      "xargs compresses command output into a single line",
      "xargs converts standard input into arguments for another command, enabling batch operations on piped results",
      "xargs runs commands in parallel across multiple CPU cores automatically",
      "xargs is an alias for 'exec args' and only works inside find commands",
    ],
    answer: 1,
    explanation:
      "xargs reads items from standard input and executes a specified command with those items as arguments. This is valuable with find because it can batch many filenames into fewer command invocations (e.g., `find . -name '*.txt' | xargs wc -l`), which is more efficient than running a separate command per file. Use -0 with find's -print0 to handle filenames with spaces.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question: "What does the permission mode 755 mean for a file in Unix?",
    options: [
      "Owner can read/write, group can read, others have no access",
      "Owner can read/write/execute, group and others can read/execute",
      "Everyone can read/write/execute the file",
      "Owner can execute, group can read/write, others can read",
    ],
    answer: 1,
    explanation:
      "In the octal permission notation, each digit represents permissions for owner, group, and others respectively. 7 = read(4) + write(2) + execute(1), and 5 = read(4) + execute(1). So 755 means the owner has full access, while group and others can read and execute but not modify the file. This is the standard permission for executable scripts and directories.",
  },

  // --- Topic 4: Shell Scripting ---
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      'What does `set -euo pipefail` at the top of a Bash script do?',
    options: [
      "Enables verbose logging, unlimited recursion, and pipe buffering",
      "Makes the script exit on errors (-e), treat unset variables as errors (-u), and fail if any command in a pipeline fails (-o pipefail)",
      "Sets environment variables for error handling that persist after the script exits",
      "Enables extended debugging mode with line-by-line execution tracing",
    ],
    answer: 1,
    explanation:
      "This is the 'strict mode' for Bash scripts. -e causes the script to exit immediately if any command returns a non-zero status. -u treats references to unset variables as errors. -o pipefail means a pipeline's exit status is the exit status of the last command to fail (not just the last command). Together, they catch many common scripting bugs early.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      'In a Bash script, what is the difference between `$@` and `$*` when used inside double quotes?',
    options: [
      'There is no difference — both expand to all positional parameters',
      '"$@" expands each parameter as a separate quoted word, "$*" joins them into a single string separated by IFS',
      '"$*" preserves argument boundaries, "$@" concatenates everything',
      '"$@" only works in functions, "$*" only works in scripts',
    ],
    answer: 1,
    explanation:
      'When double-quoted, "$@" expands each positional parameter as a separate word, preserving argument boundaries (an argument with spaces stays as one argument). "$*" joins all parameters into a single string using the first character of IFS (usually a space). This distinction matters when passing arguments to other commands — "$@" is almost always what you want.',
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What is a common defensive scripting pattern for ensuring a temporary file is cleaned up even if the script fails?",
    options: [
      "Place the rm command at the end of the script",
      "Use a trap command to register a cleanup function that runs on EXIT signal",
      "Create the temp file in /dev/null so it auto-deletes",
      "Use the 'volatile' keyword when creating the file",
    ],
    answer: 1,
    explanation:
      "The `trap` builtin lets you register commands or functions to execute when the shell receives a signal. `trap cleanup EXIT` ensures the cleanup function runs when the script exits for any reason — normal completion, errors (with set -e), or signals like SIGINT (Ctrl+C). This is the standard pattern for resource cleanup in shell scripts, similar to try/finally in other languages.",
  },

  // ===== Part 2: Git Mastery =====

  // --- Topic 5: Git Workflow & Branching ---
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "In a Git Flow branching model, what is the purpose of a 'release' branch?",
    options: [
      "To hold experimental features that may never be merged",
      "To prepare a new production release, allowing final bug fixes and version bumps without blocking ongoing development",
      "To store the production-ready code permanently",
      "To automatically deploy code to staging servers",
    ],
    answer: 1,
    explanation:
      "A release branch is created from the develop branch when it has enough features for a release. It allows last-minute fixes, version number updates, and metadata changes without blocking new feature development on develop. Once ready, it is merged into both main (for production) and back into develop (to capture any fixes made during the release process).",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "During an interactive rebase (`git rebase -i`), what does the 'squash' command do?",
    options: [
      "Deletes the commit entirely from history",
      "Combines the commit with the previous commit, merging their commit messages into one",
      "Moves the commit to a different branch",
      "Converts the commit into an unstaged change",
    ],
    answer: 1,
    explanation:
      "The 'squash' (or 's') command in interactive rebase melds a commit into the one directly above it in the rebase list (the earlier commit). It combines both sets of changes and opens your editor to let you combine the commit messages. This is different from 'fixup' which also melds commits but discards the squashed commit's message. Squashing is commonly used to clean up WIP commits before merging a feature branch.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What is the advantage of using `git worktree` over switching branches with `git checkout`?",
    options: [
      "Worktrees are faster because they skip the index",
      "Worktrees let you have multiple branches checked out simultaneously in separate directories, avoiding the need to stash or commit work-in-progress",
      "Worktrees automatically merge changes between branches",
      "Worktrees create lightweight copies that don't take up disk space",
    ],
    answer: 1,
    explanation:
      "Git worktrees allow you to check out multiple branches at the same time in separate working directories, all sharing the same .git repository. This means you can work on a hotfix without stashing or committing your current feature work, or run tests on one branch while developing on another. Each worktree has its own working directory and index but shares the object store.",
  },

  // --- Topic 6: Advanced Git ---
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "How does `git bisect` help you find the commit that introduced a bug?",
    options: [
      "It scans every commit's diff for suspicious patterns",
      "It performs a binary search through commit history, letting you mark commits as good or bad to efficiently isolate the problematic commit",
      "It runs your test suite on every commit since the last release",
      "It compares two branches and highlights the differences",
    ],
    answer: 1,
    explanation:
      "git bisect uses binary search to efficiently narrow down the commit that introduced a bug. You mark a known good commit and a known bad commit, and bisect checks out the midpoint for you to test. Based on whether you mark it good or bad, it halves the remaining range. This finds the offending commit in O(log n) steps. You can also automate it with `git bisect run <test-script>`.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "You accidentally ran `git reset --hard HEAD~3` and lost commits. How can you recover them?",
    options: [
      "They are permanently deleted — there is no way to recover",
      "Use `git reflog` to find the commit hash before the reset, then `git reset --hard` or `git checkout` to that hash",
      "Run `git undo` to reverse the last operation",
      "Check the .git/trash directory for the lost commits",
    ],
    answer: 1,
    explanation:
      "The reflog records every change to branch tips and HEAD, even operations that rewrite history. Running `git reflog` shows these entries with their commit hashes. You can recover by running `git reset --hard <hash>` to move your branch back to the original commit. Reflog entries are kept for 90 days by default, giving you a generous window for recovery.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is a practical use case for a Git pre-commit hook?",
    options: [
      "Automatically pushing changes to the remote after every commit",
      "Running linters or formatters on staged files to enforce code quality standards before the commit is finalized",
      "Sending email notifications to the team about the new commit",
      "Compressing the repository to save disk space",
    ],
    answer: 1,
    explanation:
      "Pre-commit hooks run before a commit is created and can abort it if they exit with a non-zero status. Common uses include running linters (ESLint, Pylint), formatters (Prettier, Black), type checkers, or checking for secrets/credentials in staged files. Tools like Husky (JS) and pre-commit (Python) make managing these hooks easier across teams.",
  },

  // --- Topic 7: Git Collaboration ---
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "When should you prefer `git rebase` over `git merge` for integrating changes from a main branch into your feature branch?",
    options: [
      "Always — rebase is strictly superior to merge in every scenario",
      "When you want a clean, linear history and the feature branch has not been shared with others or pushed publicly",
      "Only when there are no conflicts between the branches",
      "Never — rebase always causes data loss",
    ],
    answer: 1,
    explanation:
      "Rebase replays your feature commits on top of the latest main, creating a clean linear history. However, it rewrites commit hashes, which causes problems if others have based work on the original commits. The general rule is: rebase local/private branches for cleanliness, but merge shared/public branches to preserve history and avoid forcing collaborators to reconcile diverged histories.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "During a merge conflict, what do the markers `<<<<<<<`, `=======`, and `>>>>>>>` represent?",
    options: [
      "The first section is the remote version, the second is your local version",
      "The section between <<<<<<< and ======= is your current branch's version, and between ======= and >>>>>>> is the incoming branch's version",
      "They represent three-way diff output from the common ancestor",
      "The markers are Git comments and can be ignored safely",
    ],
    answer: 1,
    explanation:
      "In a merge conflict, the content between <<<<<<< HEAD (or your branch name) and ======= shows your current branch's changes. The content between ======= and >>>>>>> (the other branch name) shows the incoming changes. You resolve the conflict by editing the file to keep the desired content and removing all three markers. Tools like VS Code provide UI helpers to accept either or both changes.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "What problem does a monorepo tool like Turborepo or Nx solve compared to using plain Git?",
    options: [
      "They replace Git entirely with a more efficient version control system",
      "They provide intelligent task orchestration, caching, and dependency-aware builds across multiple packages in a single repository",
      "They split a monorepo into multiple Git repositories automatically",
      "They add Git LFS support for large binary files",
    ],
    answer: 1,
    explanation:
      "Monorepo tools like Turborepo and Nx understand the dependency graph between packages in a repository. They enable features like running only affected tests when a package changes, caching build outputs (locally and remotely) to skip redundant work, and parallel task execution with correct ordering. This dramatically speeds up CI/CD and local development in large codebases with many interconnected packages.",
  },

  // ===== Part 3: Automation & Productivity =====

  // --- Topic 8: Task Automation ---
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "What does the cron expression `0 */6 * * *` mean?",
    options: [
      "Run every 6 minutes",
      "Run at minute 0 of every 6th hour (00:00, 06:00, 12:00, 18:00)",
      "Run on the 6th of every month",
      "Run every 6 seconds",
    ],
    answer: 1,
    explanation:
      "A cron expression has five fields: minute, hour, day-of-month, month, and day-of-week. The expression `0 */6 * * *` means: at minute 0, every 6th hour (*/6 is a step value), every day of the month, every month, every day of the week. This schedules the job to run 4 times daily. Understanding cron syntax is essential for scheduling automated tasks on Unix systems.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "In a Makefile, what is the purpose of declaring a target as `.PHONY`?",
    options: [
      "It marks the target as optional so it can be skipped",
      "It tells Make that the target is not a real file, so it should always run the recipe regardless of whether a file with that name exists",
      "It creates a placeholder target that does nothing",
      "It makes the target run in a separate process for parallelism",
    ],
    answer: 1,
    explanation:
      "Make normally checks if a target file exists and is newer than its prerequisites to decide whether to run the recipe. If you have a target called 'clean' or 'test' and a file with the same name exists in the directory, Make would skip the recipe thinking the target is up-to-date. Declaring `.PHONY: clean test` ensures those recipes always execute regardless of any files with matching names.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What tool or technique would you use to automatically re-run a build command when source files change?",
    options: [
      "A cron job that runs the build every minute",
      "A file-watching tool like nodemon, watchexec, or entr that monitors file changes and triggers commands",
      "Manually running the build after each save",
      "Setting up a Git pre-commit hook to rebuild",
    ],
    answer: 1,
    explanation:
      "File-watching tools use OS-level filesystem events (inotify on Linux, FSEvents on macOS) to detect changes efficiently without polling. Tools like entr (`ls *.ts | entr npm run build`), watchexec (`watchexec -e ts -- npm run build`), and nodemon are purpose-built for this workflow. They provide near-instant feedback during development, which is much more efficient than polling or manual rebuilds.",
  },

  // --- Topic 9: SSH & Remote Operations ---
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What is the benefit of configuring SSH hosts in `~/.ssh/config`?",
    options: [
      "It encrypts your SSH private keys with an extra layer of security",
      "It lets you define aliases, default users, ports, and identity files per host, simplifying SSH commands",
      "It automatically rotates SSH keys on a schedule",
      "It enables SSH connections without any authentication",
    ],
    answer: 1,
    explanation:
      "The SSH config file lets you define per-host settings like hostname, user, port, identity file, and proxy commands. Instead of typing `ssh -i ~/.ssh/work_key -p 2222 deploy@192.168.1.50`, you can configure a host alias and just type `ssh work-server`. This also works with scp, rsync, and Git over SSH, making all remote operations more convenient and less error-prone.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What does `ssh -L 8080:localhost:3000 remote-server` do?",
    options: [
      "Starts a web server on port 8080 on the remote server",
      "Creates a local port forward: connections to your local port 8080 are tunneled through SSH to port 3000 on the remote server",
      "Redirects all traffic from the remote server's port 3000 to your local port 8080",
      "Limits the SSH connection bandwidth to 8080 KB/s",
    ],
    answer: 1,
    explanation:
      "Local port forwarding (-L) creates a tunnel from a port on your local machine to a port accessible from the remote server. In this case, opening localhost:8080 in your browser sends traffic through the encrypted SSH tunnel to port 3000 on the remote server. This is commonly used to access web apps, databases, or services running on remote machines that are not exposed publicly.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      'What does `ssh remote-server "cd /app && git pull && npm run build"` do?',
    options: [
      "Opens an interactive SSH session and then runs the commands manually",
      "Executes the quoted commands on the remote server non-interactively and returns the output to your local terminal",
      "Copies the commands to a file on the remote server for later execution",
      "Runs the commands locally and sends the output to the remote server",
    ],
    answer: 1,
    explanation:
      "Passing a command string to SSH executes it on the remote server without opening an interactive session. The commands run in sequence (using && for conditional chaining), and stdout/stderr are streamed back to your local terminal. This is the foundation of remote deployment scripts and automation. For more complex operations, consider tools like Ansible or Fabric.",
  },

  // --- Topic 10: Environment Management ---
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "What problem do version managers like nvm, pyenv, and rbenv solve?",
    options: [
      "They provide faster package installation than npm, pip, and gem",
      "They allow you to install and switch between multiple versions of a language runtime per project or globally",
      "They replace the system package manager for installing system libraries",
      "They automatically update language runtimes to the latest version",
    ],
    answer: 1,
    explanation:
      "Version managers let you install multiple versions of a language (e.g., Node 18 and Node 20) and switch between them per-project or globally. This is essential when different projects require different runtime versions. Tools like nvm use .nvmrc files and pyenv uses .python-version files to automatically activate the correct version when you enter a project directory.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is the main advantage of managing your dotfiles in a Git repository?",
    options: [
      "It makes your shell start up faster",
      "It provides version history, easy replication across machines, and a backup of your personalized development environment",
      "It encrypts your configuration files for security",
      "Git automatically applies dotfile changes to all connected machines",
    ],
    answer: 1,
    explanation:
      "Storing dotfiles (.bashrc, .vimrc, .gitconfig, etc.) in a Git repo gives you version history so you can track and revert changes, the ability to quickly set up a new machine by cloning and running a bootstrap script, and sharing configurations across work and personal machines. Tools like GNU Stow or chezmoi help manage symlinks from the repo to the correct locations in your home directory.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What is the primary purpose of Dev Containers (devcontainers)?",
    options: [
      "To deploy production applications in Docker containers",
      "To provide a fully configured, reproducible development environment using a container definition that any team member can use identically",
      "To run your IDE inside a virtual machine for better performance",
      "To isolate network traffic during development",
    ],
    answer: 1,
    explanation:
      "Dev Containers define your development environment as code using a devcontainer.json file and a Dockerfile or Docker Compose configuration. This ensures every team member gets the exact same tools, language versions, extensions, and settings regardless of their host OS. VS Code, GitHub Codespaces, and other tools support this standard, eliminating 'works on my machine' issues.",
  },

  // ===== Part 4: Advanced Developer Tools =====

  // --- Topic 11: Terminal Multiplexing & Workflow ---
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What happens to processes running in a tmux session when you detach from it or lose your SSH connection?",
    options: [
      "All processes are immediately terminated",
      "Processes continue running in the background — you can reattach to the session later and resume where you left off",
      "Processes are paused and resume only when you reattach",
      "tmux saves the process state to disk and restores it on reattach",
    ],
    answer: 1,
    explanation:
      "tmux sessions persist independently of your terminal connection. When you detach (Ctrl+B, D) or lose your connection, the tmux server keeps all processes running. You can reattach with `tmux attach` and find everything exactly as you left it. This makes tmux indispensable for long-running tasks on remote servers and for maintaining persistent development environments across SSH sessions.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What does the tool `fzf` provide for command-line workflows?",
    options: [
      "A file compression utility with fuzzy matching for filenames",
      "An interactive fuzzy finder that lets you search and select from lists of files, command history, git branches, and more",
      "A file system checker that finds and repairs corrupt files",
      "A faster replacement for the 'find' command with no interactive features",
    ],
    answer: 1,
    explanation:
      "fzf is a general-purpose fuzzy finder that reads any list from stdin and provides an interactive interface for filtering and selecting items. Its power comes from integrations: Ctrl+R for fuzzy command history search, Ctrl+T for file picking, Alt+C for directory jumping, and custom bindings for git branches, processes, and more. It transforms many workflows from recall-based to recognition-based.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What is the benefit of using a modern terminal emulator like Alacritty, Kitty, or WezTerm over a traditional terminal?",
    options: [
      "They support more programming languages out of the box",
      "They offer GPU-accelerated rendering, better font support, and configuration-as-code for consistent appearance and behavior",
      "They include a built-in code editor that replaces vim and nano",
      "They automatically manage tmux sessions without any setup",
    ],
    answer: 1,
    explanation:
      "Modern terminals use GPU acceleration for smooth rendering even with heavy output, support ligatures and font fallback chains for better readability, and are configured via files (YAML, TOML, Lua) that can be version-controlled. They also offer features like clickable URLs, image rendering (Kitty protocol), multiplexing (WezTerm, Kitty), and lower input latency, all improving the daily developer experience.",
  },

  // --- Topic 12: Debugging & System Analysis ---
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "What is the difference between `kill` and `kill -9` (SIGKILL) when terminating a process?",
    options: [
      "There is no difference — both immediately terminate the process",
      "kill sends SIGTERM (allowing graceful shutdown), while kill -9 sends SIGKILL (immediately terminates without cleanup)",
      "kill -9 sends the signal 9 times to ensure the process stops",
      "kill terminates the process tree, kill -9 only terminates the single process",
    ],
    answer: 1,
    explanation:
      "The default `kill` sends SIGTERM (signal 15), which asks the process to terminate gracefully — it can catch this signal, save state, close connections, and clean up. SIGKILL (signal 9) cannot be caught or ignored; the kernel immediately terminates the process. Always try SIGTERM first and only use SIGKILL as a last resort, as it can leave resources in an inconsistent state (temp files, database locks, etc.).",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "Which command would you use to check what process is listening on port 3000?",
    options: [
      "ping localhost:3000",
      "lsof -i :3000",
      "ps aux | grep 3000",
      "netstat -version 3000",
    ],
    answer: 1,
    explanation:
      "lsof (list open files) with -i :3000 shows all processes that have network connections on port 3000, including the process name, PID, and connection state. On Linux, `ss -tlnp` is another option. The `ps aux | grep 3000` approach can work but is unreliable as it only matches '3000' in the command line, not the actual port binding. This is one of the most common debugging tasks when a port is already in use.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "What does the `df -h` command show, and when is it useful?",
    options: [
      "Shows all running Docker containers with their resource usage",
      "Shows disk space usage for all mounted filesystems in human-readable format (GB, MB)",
      "Shows the difference between two files in a human-readable format",
      "Shows available memory (RAM) on the system",
    ],
    answer: 1,
    explanation:
      "df (disk free) shows the total, used, and available space on each mounted filesystem. The -h flag formats sizes in human-readable units (KB, MB, GB) instead of raw block counts. This is essential for diagnosing 'no space left on device' errors, monitoring disk usage on servers, and understanding how storage is distributed across mount points. For per-directory usage, use `du -sh *` instead.",
  },

  // --- Topic 13: CLI Tool Building & One-Liners ---
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "What does this one-liner do: `sort file.txt | uniq -c | sort -rn | head -10`?",
    options: [
      "Sorts the file alphabetically and removes all duplicates",
      "Finds the 10 most frequently occurring lines in the file, sorted by count in descending order",
      "Sorts the file numerically and shows the first 10 lines",
      "Removes the top 10 lines from the file and saves the result",
    ],
    answer: 1,
    explanation:
      "This pipeline first sorts the file (required because uniq only detects adjacent duplicates), then `uniq -c` counts consecutive identical lines and prefixes each with its count. `sort -rn` sorts numerically in reverse (highest first), and `head -10` shows the top 10 results. This is one of the most useful Unix one-liners for quick data analysis — finding top error messages in logs, most common words, frequent IP addresses, etc.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "In a regular expression, what does the pattern `^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$` match?",
    options: [
      "Any string containing exactly 4 digits separated by dots",
      "A string that looks like an IPv4 address — four groups of 1-3 digits separated by literal dots (though it does not validate the range 0-255)",
      "Only valid IPv4 addresses with values between 0 and 255",
      "A floating-point number with up to 3 decimal places",
    ],
    answer: 1,
    explanation:
      "The ^ and $ anchors ensure the entire string must match. \\d{1,3} matches 1 to 3 digits, and \\. matches a literal dot (the backslash escapes the special meaning of dot). This pattern captures the basic structure of an IPv4 address but would also match invalid values like 999.999.999.999. Fully validating IPv4 ranges with regex is possible but extremely verbose — in practice, a programmatic check is cleaner.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "When building a CLI tool, what is the purpose of exit codes?",
    options: [
      "They display a message to the user before the program exits",
      "They communicate the success or failure status to the calling process — 0 means success, non-zero means an error occurred",
      "They determine how much memory the operating system reclaims",
      "They set the return value of the main function for use in unit tests",
    ],
    answer: 1,
    explanation:
      "Exit codes (0-255) are how programs communicate their result to the shell or parent process. By convention, 0 means success and any non-zero value indicates an error. Specific codes can convey different error types (1 for general errors, 2 for misuse, 126 for permission denied, 127 for command not found). Scripts use these codes with && and || operators, and CI systems use them to determine if a step passed or failed.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
