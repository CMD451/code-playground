#!/bin/bash

SOURCE_CODE="$1"
INPUT_FILE="input.c"
OUTPUT_FILE="output.out"

echo "Compiling $SOURCE_CODE..."
printf "$SOURCE_CODE" >> "$INPUT_FILE"
gcc "$INPUT_FILE" -o "$OUTPUT_FILE"

if [ $? -ne 0 ]; then
  echo "Compilation failed."
  exit 1
fi

echo "Running $OUTPUT_FILE..."
./"$OUTPUT_FILE"

