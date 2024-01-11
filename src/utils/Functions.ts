export const formatBalance = (value: number): string => {
	if (value < 0) {
	  return '0';
	} else if (value < 10000) {
	  return value.toString();
	} else if (value < 1000000) {
	  return (value / 1000).toFixed(0) + 'K';
	} else if (value < 1000000000) {
	  return (value / 1000000).toFixed(1) + 'M';
	} else if (value < 1000000000000) {
	  return (value / 1000000000).toFixed(1) + 'B';
	} else if (value < 1000000000000000) {
	  return (value / 1000000000000).toFixed(1) + 'T';
	} else {
	  return '0'; // or any custom message for values beyond a trillion
	}
  };
  