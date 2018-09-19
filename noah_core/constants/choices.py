from enum import Enum


def enumToChoices(cls):
    return tuple((e.value, e.name) for e in list(cls))


class UserTokenType(Enum):
    ACCESS = 1
    VERIFICATION = 2


class ReceiverRequestPostingForType(Enum):
    SELF = 1
    FAMILY = 2
    ORGANISATION = 3


class HubType(Enum):
    COLLECTION = 1
    DISTRIBUTION = 2


class VolunteerContributionType(Enum):
    FULL_TIME = 1
    PART_TIME_WEEKDAYS = 2
    PART_TIME_WEEKDAYS_FULL_TIME_WEEKENDS = 3
    ONLY_WEEKENDS = 4


class VolunteerVehicleType(Enum):
    CAR = 1
    BIKE = 2
    NO = 3


class VolunteerRequestStatus(Enum):
    RECEIVED = 1


class DonationStatus(Enum):
    RECEIVED = 1


class ReceiverRequestStatus(Enum):
    RECEIVED = 1
