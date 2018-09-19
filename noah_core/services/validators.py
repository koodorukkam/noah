def is_valid_phone_number(number):
    if number.isdigit() is False:
        raise Exception("Phone number cannot have non-integer characters")
    if len(number) != 10:
        raise Exception("Phone number has to be 10 digits")
