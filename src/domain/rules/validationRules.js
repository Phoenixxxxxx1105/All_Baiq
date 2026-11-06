export const validateQuantity = (rawValue, initialStock) => {
  if (rawValue === '' || rawValue === null || rawValue === undefined) {
    return {
      isValid: false,
      reason: 'Jumlah harus bilangan bulat positif',
    };
  }

  const stringValue = String(rawValue).trim();
  if (stringValue === '') {
    return {
      isValid: false,
      reason: 'Jumlah harus bilangan bulat positif',
    };
  }

  if (!/^\d+$/.test(stringValue)) {
    return {
      isValid: false,
      reason: 'Jumlah harus bilangan bulat positif',
    };
  }

  const parsedNumber = Number(stringValue);

  if (!Number.isInteger(parsedNumber) || parsedNumber <= 0) {
    return {
      isValid: false,
      reason: 'Jumlah harus bilangan bulat positif',
    };
  }

  if (parsedNumber > initialStock) {
    return {
      isValid: false,
      reason: `Jumlah melebihi stok (maksimal ${initialStock})`,
    };
  }

  return {
    isValid: true,
    value: parsedNumber,
  };
};

export const validateIncrement = (currentQty = 0, initialStock = 0) => {
  if (initialStock <= 0) {
    return {
      canAdd: false,
      reason: 'Stok menu habis',
    };
  }

  if (currentQty >= initialStock) {
    return {
      canAdd: false,
      reason: `Jumlah melebihi stok (maksimal ${initialStock})`,
    };
  }

  return {
    canAdd: true,
  };
};
