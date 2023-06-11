// export const getDros = async () => {
//   let dros1n = Math.round(Math.random() * 99),
//     dros2n = Math.round(Math.random() * 99);
//   while (dros1n == dros2n) dros2n = Math.round(Math.random() * 99);
//   const dros1 = await fetch(
//     "https://ipfs.io/ipfs/QmcppupRBTq8Q1xMJ14d8vR1GCQUdWr1cLN21vNJC8jwKr/" +
//       dros1n
//   );
//   const dros2 = await fetch(
//     "https://ipfs.io/ipfs/QmcppupRBTq8Q1xMJ14d8vR1GCQUdWr1cLN21vNJC8jwKr/" +
//       dros2n
//   );
//   return [await dros1.json(), await dros2.json()];
// };

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