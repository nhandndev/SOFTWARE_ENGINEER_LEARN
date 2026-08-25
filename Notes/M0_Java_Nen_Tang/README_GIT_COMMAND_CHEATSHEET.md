# Git Command Cheat Sheet

> Dùng để tra nhanh. Không phải bài giảng.

---

## 1. Kiểm Tra Trạng Thái

| Lệnh | Ý nghĩa |
|---|---|
| `git status` | Xem repo đang thay đổi gì |
| `git diff` | Xem thay đổi chưa staged |
| `git diff --staged` | Xem thay đổi đã staged |
| `git log --oneline` | Xem lịch sử commit ngắn |
| `git log --oneline --graph --decorate --all` | Xem lịch sử dạng nhánh |

---

## 2. Add / Commit

| Lệnh | Ý nghĩa |
|---|---|
| `git add <file>` | Đưa file vào staging area |
| `git add .` | Stage tất cả thay đổi |
| `git restore --staged <file>` | Bỏ file khỏi staging, giữ nội dung sửa |
| `git commit -m "message"` | Tạo commit từ staging area |

```bash
git status
git add README.md
git commit -m "docs: update readme"
```

```text
git add = chọn file cho commit kế tiếp
git commit = lưu snapshot vào lịch sử
```

---

## 3. Branch

| Lệnh | Ý nghĩa |
|---|---|
| `git branch` | Xem branch local |
| `git branch -a` | Xem cả branch local và remote |
| `git switch <branch>` | Chuyển branch |
| `git switch -c <branch>` | Tạo branch mới và chuyển vào |
| `git branch -d <branch>` | Xóa branch local đã merge |
| `git branch -D <branch>` | Ép xóa branch local |

```bash
git switch main
git pull
git switch -c feature/maven-setup
```

---

## 4. Remote / Pull / Push

| Lệnh | Ý nghĩa |
|---|---|
| `git remote -v` | Xem remote URL |
| `git fetch origin` | Lấy thông tin remote, chưa merge |
| `git pull` | Lấy code remote và nhập vào branch hiện tại |
| `git push origin <branch>` | Push branch lên remote |
| `git push -u origin <branch>` | Push lần đầu và set upstream |

```bash
git push origin feature/maven-setup
```

---

## 5. Pull Request Workflow

```bash
git switch main
git pull
git switch -c feature/readme-gitignore

# sửa file

git status
git add README.md .gitignore
git commit -m "docs: add readme and gitignore"
git push origin feature/readme-gitignore
```

```text
Open PR -> write summary/test -> review -> fix if needed -> merge
```

```text
push branch chưa phải merge vào main
```

---

## 6. Merge

| Lệnh | Ý nghĩa |
|---|---|
| `git merge <branch>` | Merge branch vào branch hiện tại |
| `git merge --abort` | Hủy merge đang conflict |

```bash
git switch main
git pull
git merge feature/readme
```

---

## 7. Rebase

| Lệnh | Ý nghĩa |
|---|---|
| `git rebase <branch>` | Dời base của branch hiện tại lên branch khác |
| `git rebase --continue` | Tiếp tục rebase sau khi sửa conflict |
| `git rebase --abort` | Hủy rebase |

```bash
git switch feature/maven-setup
git rebase main
```

```text
merge = nhập nhánh
rebase = dời nền nhánh
```

---

## 8. Conflict

Marker conflict:

```text
<<<<<<< HEAD
code hiện tại
=======
code từ branch kia
>>>>>>> feature/name
```

Resolve khi merge:

```bash
# mở file, sửa nội dung, xóa marker
git status
git add <file>
git commit
```

Resolve khi rebase:

```bash
# mở file, sửa nội dung, xóa marker
git status
git add <file>
git rebase --continue
```

```text
sửa code -> xóa marker -> add -> commit/continue
```

---

## 9. Stash

| Lệnh | Ý nghĩa |
|---|---|
| `git stash` | Cất thay đổi đang sửa dở |
| `git stash push -m "message"` | Cất thay đổi kèm ghi chú |
| `git stash list` | Xem danh sách stash |
| `git stash pop` | Lấy stash ra và xóa khỏi list |
| `git stash apply` | Lấy stash ra nhưng giữ trong list |

```bash
git status
git stash push -m "wip: current work"
git switch main

# làm việc gấp

git switch feature/current-work
git stash pop
```

---

## 10. `.gitignore` Và File Đã Track

`.gitignore` Java/Maven/IDE:

```gitignore
target/
*.class
.idea/
*.iml
.vscode/
.DS_Store
*.log
```

Nếu file đã bị Git track:

```bash
git rm -r --cached target
git rm --cached SomeFile.class
git add .gitignore
git commit -m "chore: remove generated files from git tracking"
```

```text
.gitignore chặn file chưa track
git rm --cached gỡ file đã track
```

---

## 11. Undo / Restore

| Lệnh | Ý nghĩa |
|---|---|
| `git restore <file>` | Bỏ thay đổi chưa staged |
| `git restore --staged <file>` | Unstage file |
| `git revert <hash>` | Tạo commit mới để đảo ngược commit cũ |
| `git reset --soft HEAD~1` | Bỏ commit gần nhất, giữ staged |
| `git reset HEAD~1` | Bỏ commit gần nhất, giữ file sửa nhưng unstaged |
| `git reset --hard HEAD~1` | Bỏ commit và xóa thay đổi local |

```text
git reset --hard có thể làm mất code
```

---

## 12. Cherry-pick

| Lệnh | Ý nghĩa |
|---|---|
| `git cherry-pick <hash>` | Lấy một commit cụ thể từ branch khác |

```bash
git switch main
git cherry-pick abc1234
```

---

## 13. Clean

| Lệnh | Ý nghĩa |
|---|---|
| `git clean -n` | Xem file untracked nào sẽ bị xóa |
| `git clean -f` | Xóa file untracked |
| `git clean -fd` | Xóa file/folder untracked |

```bash
git clean -n
```

---

## 14. Tag

| Lệnh | Ý nghĩa |
|---|---|
| `git tag` | Xem danh sách tag |
| `git tag v0.1.0` | Tạo tag |
| `git push origin v0.1.0` | Push tag lên remote |

---

## 15. Command Cần Thuộc Cho M0-5

```bash
git status
git diff
git add .
git commit -m "message"
git log --oneline
git switch main
git switch -c feature/name
git pull
git push origin feature/name
git merge feature/name
git rebase main
git stash push -m "wip: message"
git stash pop
git rm -r --cached target
git restore --staged file
git revert <hash>
```

---

## 16. Câu Nói Nhanh

```text
Git = quản lý version code
GitHub = host repo + PR/review/collaboration
add = đưa vào staging
commit = lưu snapshot
push = đưa branch lên remote
PR = xin merge vào main
merge = nhập nhánh
rebase = dời nền nhánh
stash = cất code sửa dở
.gitignore = chặn file chưa track
git rm --cached = gỡ file đã track
```
