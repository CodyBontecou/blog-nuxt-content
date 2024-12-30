#!/bin/bash

# Find all .yml files in the current directory and subdirectories
find . -type f -name "*.yml" | while read -r file; do
    # Get the filename without the path
    filename=$(basename "$file")
    
    # Check if filename has more than 2 characters (excluding .yml)
    name_without_ext="${filename%.yml}"
    if [ ${#name_without_ext} -gt 2 ]; then
        # Create new filename by removing third character
        new_name="${name_without_ext:0:2}${name_without_ext:3}"
        
        # Get the directory path
        dir_path=$(dirname "$file")
        
        # Rename the file
        mv "$file" "$dir_path/$new_name.yml"
        echo "Renamed: $filename → $new_name.yml"
    fi
done
