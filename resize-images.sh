for file in *.jpg; do
    if [ -f "$file" ]; then
        convert "$file" -resize 1920x1920\> "web_${file}"
    fi
done
