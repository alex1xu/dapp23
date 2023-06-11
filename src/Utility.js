export const getDros = async () => {
  const dros = [];
  for (let i = 0; i < 100; i++) {
    const dros1 = await fetch(
      "https://ipfs.io/ipfs/QmcppupRBTq8Q1xMJ14d8vR1GCQUdWr1cLN21vNJC8jwKr/" +
        i
    );
    dros.push(await dros1.json());

  }
    return dros;
};

export const getOdds = (dros1, dros2) => {
  return [
    reduce(dros1?.score, dros2?.score)[0],
    reduce(dros1?.score, dros2?.score)[1],
  ];
};

function reduce(numerator, denominator) {
  var gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}