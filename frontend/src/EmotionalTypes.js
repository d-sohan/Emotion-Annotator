export default function suggestEmotion(anoVal) {
  const ans = [];
  for (let i = 0; i < anoVal.length; i++) {
    let emoName = '';
    if (anoVal[i] <= -10) {
      switch (i) {
        case 0:
          emoName = 'anxiety';
          break;
        case 1:
          emoName = 'ennui';
          break;
        case 2:
          emoName = 'frustration';
          break;
        case 3:
          emoName = 'dispirited';
          break;
        case 4:
          emoName = 'terror';
          break;
        case 5:
          emoName = 'humiliated';
          break;
      }
    } else if (anoVal[i] <= -5) {
      switch (i) {
        case 0:
          emoName = 'worry';
          break;
        case 1:
          emoName = 'boredom';
          break;
        case 2:
          emoName = 'disappointed';
          break;
        case 3:
          emoName = 'puzzlement';
          break;
        case 4:
          emoName = 'dread';
          break;
        case 5:
          emoName = 'embarrassed';
          break;
      }
    } else if (anoVal[i] <= 0) {
      switch (i) {
        case 0:
          emoName = 'discomfort';
          break;
        case 1:
          emoName = 'indifference';
          break;
        case 2:
          emoName = 'confusion';
          break;
        case 3:
          emoName = 'dissatisfied';
          break;
        case 4:
          emoName = 'apprehension';
          break;
        case 5:
          emoName = 'self-conscious';
          break;
      }
    } else if (anoVal[i] <= 5) {
      switch (i) {
        case 0:
          emoName = 'comfort';
          break;
        case 1:
          emoName = 'interest';
          break;
        case 2:
          emoName = 'insight';
          break;
        case 3:
          emoName = 'satisfied';
          break;
        case 4:
          emoName = 'calm';
          break;
        case 5:
          emoName = 'pleased';
          break;
      }
    } else if (anoVal[i] <= 10) {
      switch (i) {
        case 0:
          emoName = 'hopeful';
          break;
        case 1:
          emoName = 'curiosity';
          break;
        case 2:
          emoName = 'enlightenment';
          break;
        case 3:
          emoName = 'thrilled';
          break;
        case 4:
          emoName = 'anticipatory';
          break;
        case 5:
          emoName = 'satisfied';
          break;
      }
    } else if (anoVal[i] <= 15) {
      switch (i) {
        case 0:
          emoName = 'confident';
          break;
        case 1:
          emoName = 'fascination';
          break;
        case 2:
          emoName = 'epiphany';
          break;
        case 3:
          emoName = 'enthusiastic';
          break;
        case 4:
          emoName = 'excited';
          break;
        case 5:
          emoName = 'proud';
          break;
      }
    } else {
      emoName = 'error';
    }
    ans.push({
      name: emoName,
      value: anoVal[i],
    });
  }
  return ans;
}
