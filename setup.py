import random 
import string

raw = open("index.noun", "r")
cleaned = open("cleaned.txt", "w")

def read_and_filter_words(input_file, output_file):
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        for line in infile:
            first_word = line.split()[0] if line.split() else ""
            if first_word.isalpha() and len(first_word) >= 4 and (len(first_word) <= 11):
                outfile.write(first_word + '\n')

# Example usage
input_file_path = 'index.noun'
output_file_path = 'cleaned.txt'
read_and_filter_words(input_file_path, output_file_path)

# make subset


# validate subset


# make valid subset
#  pick letters, make subset, repeat until subset is valid