# Dong bo Learning Vault

## Cach hoat dong

`sync_learning_vault.sh` copy mot chieu tu folder hoc goc sang vault. File goc van nguyen; file ban copy duoc cap nhat khi chay lai script. Script khong xoa file trong vault, nen file bi xoa o nguon can duoc don thu cong neu can.

SE da dang ky trong `SYNC_SOURCES.tsv`. Folder SE duoc copy cac file Markdown o goc, `Notes/`, `Exams/`, `Progress/` va Markdown trong cac project mau. Trong `Notes/`, cac vi du `.java` cung duoc copy de bai hoc khong mat code mau. File IDE, Git, build va secret khong duoc dua vao vault.

## Chay ngay

```bash
bash /Users/lilnhan/Documents/Learning_Vault/sync_learning_vault.sh
```

Mo `/Users/lilnhan/Documents/Learning_Vault` bang Obsidian qua **Open folder as vault**. Day la ban vault chinh; ban trong Downloads chi la ban copy cu. Folder hoc SE goc van o `/Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN`, nen neu xoa folder SE goc thi khong the dong bo them bai hoc SE moi.

## Dong bo tu dong tren macOS

File `automation/com.lilnhan.learning-vault-sync.plist` la LaunchAgent chay lai script moi 60 giay va khi dang nhap. **Chua kich hoat:** tren may nay macOS da chan LaunchAgent doc script tu Downloads (`Operation not permitted`). Agent loi da duoc go, khong chay ngam. Truoc khi cai lai, can cho phep tien trinh nen truy cap folder nguon/vault hoac chuyen cac folder sang vi tri ma tien trinh nen doc duoc; sau do thu `bash sync_learning_vault.sh` va kiem tra agent. Neu di chuyen vault sang vi tri khac, phai sua duong dan script trong plist va cai lai agent.

## Them AWS, AI Engineer, Classes

Mo `SYNC_SOURCES.tsv`, bo dau `#` o dong tuong ung va thay `/absolute/path/to/...` bang duong dan folder hoc that tren may. Moi dong gom duong dan nguon, folder dich va che do `docs`, cach nhau bang tab. Chay lai script; file `.md`, PDF va anh se duoc copy theo cau truc thu muc goc. Folder ngoai duoc copy vao `AWS/Imported`, `AI_Engineer/Imported` hoac `Classes/Imported`, de khong ghi de ghi chu tao truc tiep trong vault.

Khong dat duong dan nguon la chinh `Learning_Vault` hay folder cha chua vault, vi se gay copy long nhau. Folder ChatGPT Projects khong phai duong dan local; can export hoac chep noi dung ra folder local truoc khi dang ky.

## Luu y

- Hien tai phai chay script bang tay; chi sau khi LaunchAgent duoc kich hoat thanh cong moi co dong bo dinh ky 60 giay.
- Folder trong vault la ban copy; neu sua truc tiep, lan dong bo sau co the ghi de.
- Script khong xoa ban copy cu, tranh mat ghi chu thu cong.
- Khong copy `.env`, credentials, file key vao vault.
- De AI ho tro ghi note, cho no quyen truy cap folder local va yeu cau doc `AI_CONTEXT.md`.
