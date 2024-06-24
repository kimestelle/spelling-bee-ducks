import random
import string

output_file_path = 'cleaned.txt'

output2_file_path = 'subset.txt'

def make_subset(input_file, output_file):
    letters = random.sample(list(string.ascii_lowercase), 7) + ['\n']
        
    words = [line[:-1] for line in open(input_file, 'r') if set(line).issubset(letters)]
    
    if len(validate(words, letters)) < 9:
        make_subset(input_file, output_file)
    else: 
        with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
            for word in validate(words, letters):
                outfile.write(word + "\n")

def validate(words, letters):
    dict = {}

    for letter in letters:
        dict[letter] = set()

    for word in words:
        for char in word:
            dict[char].add(word)
    
    max_key = letters[0]

    for k, v in dict.items():
        if len(v) > len(dict[max_key]):
            max_key = k

    return dict[max_key]
    
make_subset(output_file_path, output2_file_path)