export function getEmailMessages(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: "Your email does not match to email's standards",
      };
    case 2:
      return {
        code: 2,
        message: "Your email does not match to email's standards",
      };
    case 3:
      return {
        code: 3,
        message: 'This email is already taken',
      };
    case 4:
      return {
        code: 4,
        message: 'Email is required',
      };
    default:
      break;
  }
}

export function getUsernameMessages(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: 'Your username is too short, should be 6 chars minimum',
      };
    case 2:
      return {
        code: 2,
        message: 'This username does not exist',
      };
    case 3:
      return {
        code: 3,
        message: 'This username is already taken',
      };
    case 4:
      return {
        code: 4,
        message: 'Username is required',
      };
    default:
      break;
  }
}

export function getPasswordMessages(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: 'Your password is too short, should be 8 chars minimum',
      };
    case 2:
      return {
        code: 2,
        message:
          'Your password is not strong enought, it should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special chars',
      };
    case 3:
      return {
        code: 3,
        message: 'Incorect password',
      };
    case 4:
      return {
        code: 4,
        message: 'Password is required',
      };
    case 5:
      return {
        code: 5,
        message: 'Passwords do not match',
      };
    case 6:
      return {
        code: 6,
        message: 'Password confirmation is required',
      };
    case 7:
      return {
        code: 7,
        message:
          'Your password is not strong enought, it should contain at least 1 lowercase letter',
      };
    case 8:
      return {
        code: 8,
        message:
          'Your password is not strong enought, it should contain at least 1 uppercase letter',
      };
    case 9:
      return {
        code: 9,
        message:
          'Your password is not strong enought, it should contain at least 1 digit',
      };
    case 10:
      return {
        code: 10,
        message:
          'Your password is not strong enought, it should contain at least 1 special chars',
      };
    default:
      break;
  }
}

export function getAssetMessage(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: 'Label is required',
      };
    case 2:
      return {
        code: 2,
        message: 'Label is required',
      };
    case 3:
      return {
        code: 3,
        message: 'Symbol is too short',
      };
    case 4:
      return {
        code: 4,
        message: 'Symbol is too long',
      };
    case 5:
      return {
        code: 5,
        message:
          "Date is required and must match to ISO3601 date's standards (yyyy-MM-ddT00:00+00:00)",
      };
    case 6:
      return {
        code: 6,
        message: 'id_cw is requiered and must be a number',
      };
    default:
      break;
  }
}

export function getOrderMessages(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: 'User id is requiered',
      };
    case 2:
      return {
        code: 2,
        message: 'Asset symbol is requiered',
      };
    case 3:
      return {
        code: 3,
        message: 'Asset symbol provided is too short',
      };
    case 4:
      return {
        code: 4,
        message: 'Asset symbol is too long',
      };
    case 5:
      return {
        code: 5,
        message: 'Exchange name is requiered',
      };
    case 6:
      return {
        code: 6,
        message: 'Type is requiered',
      };
    case 7:
      return {
        code: 7,
        message: 'Amount is requiered and must be a number',
      };
    case 8:
      return {
        code: 8,
        message: 'Atm price is requiered and must be a number',
      };
    case 9:
      return {
        code: 9,
        message:
          "Date is required and must match to ISO3601 date's standards (yyyy-MM-ddT00:00+00:00)",
      };
    case 10:
      return {
        code: 10,
        message: "You don't have enought of the asset you try to sell",
      };
    case 11:
      return {
        code: 11,
        message:
          'The exchange that you provide seems to not exist in our application. Please send us a message to add it.',
      };

    default:
      break;
  }
}

export function getTransactionMessages(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: 'Asset symbol is requiered',
      };
    case 2:
      return {
        code: 2,
        message: 'Asset symbol provided is too short',
      };
    case 3:
      return {
        code: 3,
        message: 'Asset symbol is too long',
      };
    case 4:
      return {
        code: 4,
        message: 'Exchange name is requiered',
      };
    case 5:
      return {
        code: 5,
        message: 'Amount is requiered and must be a number',
      };
    case 6:
      return {
        code: 6,
        message: 'Atm price is requiered and must be a number',
      };
    case 7:
      return {
        code: 7,
        message: 'Type is requiered and must be 0 (deposit) or 1 (withdrawal)',
      };
    case 8:
      return {
        code: 8,
        message:
          "Date is required and must match to ISO3601 date's standards (yyyy-MM-ddT00:00+00:00)",
      };
    case 9:
      return {
        code: 9,
        message:
          'The exchange that you provide seems to not exist in our application. Please send us a message to add it.',
      };
    default:
      break;
  }
}

export function getGlobalMessages(errorCode: number) {
  switch (errorCode) {
    case 1:
      return {
        code: 1,
        message: 'Unauthorized',
      };
    default:
      break;
  }
}
