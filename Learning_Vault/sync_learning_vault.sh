#!/usr/bin/env bash
set -euo pipefail

vault_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sources_file="$vault_dir/SYNC_SOURCES.tsv"

copy_docs() {
  local source="$1" destination="$2" include_java="${3:-no}"
  local include_rules=(
    --include='*/'
    --include='*.md'
    --include='*.markdown'
    --include='*.pdf'
    --include='*.png'
    --include='*.jpg'
    --include='*.jpeg'
    --include='*.gif'
    --include='*.svg'
  )
  if [[ "$include_java" == yes ]]; then
    include_rules+=(--include='*.java')
  fi
  mkdir -p "$destination"
  rsync -a --prune-empty-dirs \
    --exclude='.*' \
    --exclude='target/' \
    --exclude='build/' \
    --exclude='node_modules/' \
    --exclude='.venv/' \
    "${include_rules[@]}" --exclude='*' \
    "$source/" "$destination/"
}

while IFS=$'\t' read -r source relative_destination mode || [[ -n "${source:-}" ]]; do
  [[ -z "${source:-}" || "$source" == \#* ]] && continue
  [[ "$relative_destination" =~ ^(Software_Engineer|AWS|AI_Engineer|Classes)(/[^.]*)?$ ]] || {
    printf 'Invalid vault destination: %s\n' "$relative_destination" >&2
    exit 1
  }
  [[ -d "$source" ]] || {
    printf 'Source not found, skipped: %s\n' "$source" >&2
    continue
  }

  source="$(cd "$source" && pwd)"
  destination="$vault_dir/$relative_destination"
  if [[ "$mode" == se ]]; then
    mkdir -p "$destination"
    for note in "$source"/*.md; do
      [[ -f "$note" ]] && rsync -a "$note" "$destination/"
    done
    [[ -d "$source/Notes" ]] && copy_docs "$source/Notes" "$destination/Notes" yes
    [[ -d "$source/Exams" ]] && copy_docs "$source/Exams" "$destination/Exams"
    [[ -d "$source/Progress" ]] && copy_docs "$source/Progress" "$destination/Progress"
    for project in shopcore m1-3-jpa-mini-project m1-4-validation-mini-project; do
      [[ -d "$source/$project" ]] && copy_docs "$source/$project" "$destination/Projects/$project"
    done
  elif [[ "$mode" == docs ]]; then
    [[ "$relative_destination" == */* ]] || {
      printf 'Docs destination must be a subfolder: %s\n' "$relative_destination" >&2
      exit 1
    }
    case "$vault_dir/" in
      "$source/"*) printf 'Source contains vault, skipped: %s\n' "$source" >&2; continue ;;
    esac
    copy_docs "$source" "$destination"
  else
    printf 'Unknown sync mode: %s\n' "$mode" >&2
    exit 1
  fi
  printf 'Synced %s -> %s\n' "$source" "$destination"
done < "$sources_file"
