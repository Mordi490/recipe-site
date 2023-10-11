#!/bin/bash

# Default prefix is an empty string
prefix=""

# Default output file is "output.txt" in the current directory
output_file="output.txt"

# Parse command-line options
while getopts ":p:o:" opt; do
    case ${opt} in
    p)
        prefix="${OPTARG}"
        ;;
    o)
        output_file="${OPTARG}"
        ;;
    \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
    esac
done

# Shift the command line arguments so that $1 now refers to the source folder
shift $((OPTIND - 1))

if [ $# -ne 1 ]; then
    echo "Usage: $0 [-p prefix] [-o output_file] source_folder"
    exit 1
fi

source_folder="$1"

# Use 'find' to list all files in the source folder
find "$source_folder" -type f |
    # Use 'awk' to extract filenames with extensions and add prefix (if specified)
    awk -F/ -v prefix="$prefix" '{gsub(/\.\//, "", $NF); print "\"" prefix $NF "\", "}' >"$output_file"

# Remove the trailing comma and space
sed -i 's/, $//' "$output_file"
