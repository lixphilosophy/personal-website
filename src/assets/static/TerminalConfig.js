import React from 'react';
import { say } from 'cowsay-browser';

export const Mode = {
  default: 0,
  mail: 1
}

export const CMD = {
  HELP: 'help',
  WHOAMI: 'whoami',
  INFO: 'info',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  MAIL: 'mail',
  CLEAR: 'clear',
  NULL: ''
};

export const CMD_INFO = {
  LIST: '--list',
  PROJ: 'proj',
  EDU: 'edu',
  INTEREST: 'interest',
  IMAGE: 'head-image'
};

export const CMD_NOTFOUND = 'Command not found: ';
export const CMD_PREFIX = 'INPUT-CMD ';

export const Greeding = [
  'Welcome to my website.',
  'Type \'help\' command to show command list.',
];

export const Help = [
    `Commond Options:`,
    `  ${CMD.HELP}       Show command list.`,
    `  ${CMD.WHOAMI}     Print information about me.`,
    `  ${CMD.INFO}       More information about me.`,
    `  ${CMD.GITHUB}     Goto my github page.`,
    `  ${CMD.LINKEDIN}   Open my linkedin page.`,
    `  ${CMD.MAIL}       Send me a email request.`,
    `  ${CMD.CLEAR}      Clear the display.`,
];

export const Whoami = [
  'Thanks for your interest in my page!',
  'My name is Martin Li. I am from Guangzhou, China and I am currently studying in Computer Science at Portland State University.',
  'Type \'info proj\' to check my side projects.',
  'I am a learning enthusiast and explorer. I love meeting people and discussing, so try to hit me with any of your crazy ideas.',
  'If you are interested in me, here is my email: lixphilosophy@gmail.com.',
  'Type \'mail\' command to send me a request.'
];

export const Info = {
  default: ['Type \'info --list\' to get avialable list.'],
  list: [
    'Type \'info <OPTION>\' with the following OPTION:',
    CMD_INFO.PROJ + '   ' + CMD_INFO.EDU + '   ' + CMD_INFO.INTEREST + '   ' + CMD_INFO.IMAGE
  ],
  proj: [
    'Project 1: Machine Learning on Drones: Detecting Distance Through on-board Cameras',
    'Description: Implementing autonomous drone based systems to rely on their on-board cameras to detect the distance from neighboring obstacles.',
    'Project 2: DeepShare',
    'Description: Implementing an open-source resource sharing platform accompanied by the capability to execute Distributed Tensorflow Programs at a very low cost.'
  ],
  edu: [
    'Portland State University, Poralnd, OR', 'Sep. 2014 - Dec. 2019',
    'Bachelor of Science in Computer Science', 'Minor in Mathematics'
  ],
  interest: [
    'I primarily focus on the research in Machine Learning, and its interaction with Cloud Services.'
  ],
  image: [
    say({f: "beavis.zen", text: "Hello, I'm Martin."})
  ]
};

export const GithubAddress = 'https://github.com/lixphilosophy';
export const Github = ['This is my Github page:', <a href={GithubAddress} target="_blank">{GithubAddress}</a>];

export const LinkedinAddress = 'https://www.linkedin.com/in/xuanzhe-martin-li-970366162/';
export const Linkedin = ['Here is my Linkedin page:', <a href={LinkedinAddress} target="_blank">{LinkedinAddress}</a>];

export const InstagramAddress = 'https://www.instagram.com/lixphilosophy/?hl=en';

export const Mail = {
  stage: ['Enter your name: ','Enter your email: ', 'Enter your request: '],
  invalidMail: 'Invalid email address, please retry...',
  success: 'Finished...',
  fail: 'Error happened, fail to send email...',
  to: 'lixphilosophy@gmail.com',
}
