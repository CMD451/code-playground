#!/bin/bash

SOURCE_CODE="$1"
INPUT_FILE="input.c"
OUTPUT_FILE="output.out"

echo "$SOURCE_CODE" > "$INPUT_FILE"

COMPILE_OUTPUT=$(gcc "$INPUT_FILE" -o "$OUTPUT_FILE" 2>&1)
COMPILE_STATUS=$?

if [ $COMPILE_STATUS -ne 0 ]; then
  echo "Compilation failed."
  echo "$COMPILE_OUTPUT" 
  exit 1
fi

stdbuf -o 0  ./"$OUTPUT_FILE"