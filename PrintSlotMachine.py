import random

symbol_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# random_symbol_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

reel = [[random.choice(symbol_list) for _ in range(3)] for _ in range(3)]
transpose_reel = [[reel[j][i] for j in range(3)] for i in range(3)]
                        # 1 0
                        # 2
                        # 3
                        # 4
                        # 5
# print("original data", reel)

print(reel)
print(transpose_reel)

for i in range(3):
    for j in range(3):
        if j == 2:
            print(transpose_reel[i][j], end="  ")
        else:
            print(transpose_reel[i][j], end=" | ")

    print()

# item_dict = {}
# for i, reel in enumerate(transpose_reel):
#     for j, item in enumerate(reel):
#         item_dict["key" + str(i) + str(j)] = item

# print(item_dict)
if transpose_reel[0][0] == transpose_reel[0][1] == transpose_reel[0][2]:
    print("Line1 Win")
if transpose_reel[1][0] == transpose_reel[1][1] == transpose_reel[1][2]:
    print("Line2 Win")
if transpose_reel[2][0] == transpose_reel[2][1] == transpose_reel[2][2]:
    print("Line3 Win")
if transpose_reel[0][0] == transpose_reel[1][1] == transpose_reel[2][2]:
    print("You got a diagonal win left to right")
if transpose_reel[2][0] == transpose_reel[1][1] == transpose_reel[0][2]:
    print("You got a diagonal win right to left")
if (transpose_reel[0][0] == transpose_reel[1][1] == transpose_reel[2][2]) and (
        transpose_reel[2][0] == transpose_reel[1][1] == transpose_reel[0][2]):
    print("You got a X win")
if (transpose_reel[0][0] == transpose_reel[0][1] == transpose_reel[0][2] == transpose_reel[1][0] == transpose_reel[1][
    1] == transpose_reel[1][2] == transpose_reel[2][0] == transpose_reel[2][1] == transpose_reel[2][2]):
    print("You got jackpot")
