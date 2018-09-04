/*
cowsay is a configurable talking cow,
originally written in Perl by Tony Monroe

This project is a translation in JavaScript of the original program
and an attempt to bring the same silliness to node.js.

Github: https://github.com/bushmango/cowsay-browser
*/

const text = [
  'Put that cookie down!',
  'What’s kickin’, little chicken?',
  'When nothing is going right, go left.',
  'Knock knock, cheese cake factory here.',
  'A day without sunshine is like, you know, night.',
  'If I’m driving you crazy, just remember to put on your seat belt.',
  'Mathematics is the language in which God has written the universe.',
  'It may look like I’m doing nothing, but in my head, I’m quite busy.',
  'The fool doth think he is wise, but the wise man knows himself to be a fool.',
  'Once you can accept the universe as\nmatter expanding into nothing that is\nsomething, wearing stripes with plaid\ncomes easy.',
];

export const CowsayConfig = {
  text: text,
  cow: ["bong", "moose", "small", "goat", "vader", "moofasa", "cower", "www", "default"],
  eyes: ['oo', 'oO', 'Oo', '><'],
  wrap: false,
  wrapLength: 40,
  mode: ['b', 'd', 'g', 'p', 's', 't', 'w', 'y']
};
