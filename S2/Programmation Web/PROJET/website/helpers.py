def check_message_try(message, actual, try_):
    difference = ""
    message = message.lower()
    actual = actual.lower()
    try_ = try_.lower()

    # get the difference between the correct message and the user discorvies so far 
    for i in range(len(message)): 
        if actual[i] != "_":
            difference += "_"
        else:
            difference += message[i]

    indices = []
    index = difference.find(try_)

    while index != -1: # get the start index of all the occurences
        indices.append(index)
        index = difference.find(try_, index + 1)

    actual_ = ""

    for ind in indices: # replace all the occurences
        actual_ = actual[:ind] + try_ + actual[ind + len(try_):]

    points = compute_points(len(message), len(indices), len(try_))

    if actual_ == message: # the player win
        won = True
    else:
        won = False
    
    if actual_ != "": # if nothing find by the player just return the last message from frontend
        return actual_, len(indices), points, won
    else:
        return actual, len(indices), points, won

def compute_points(message_length, occurences, try_length):
    if occurences > 0: # if nothint find, the player get a negative point
        return message_length * try_length**2 * occurences
    else:
        return -1 * message_length * try_length