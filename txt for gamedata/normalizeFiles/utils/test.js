const input = [
  '162946485-0-14198',
  '2661301-0-43',
  '3427285-0-3',
  '162946485-0-14199',
  '3427285-0-7',
  '7949764-0-27065',
  '2661301-0-44',
  '7949764-0-27066',
  '162946485-0-14197',
  '198758357-0-169837',
  '198758357-0-169835',
  '198758357-0-169836',
];

input.sort((a, b) => {
  const [aPart1, aPart2, aPart3] = a.split('-').map(Number);
  const [bPart1, bPart2, bPart3] = b.split('-').map(Number);

  if (aPart1 !== bPart1) {
    return aPart1 - bPart1;
  }
  if (aPart2 !== bPart2) {
    return aPart2 - bPart2;
  }
  return aPart3 - bPart3;
});

console.log(input);