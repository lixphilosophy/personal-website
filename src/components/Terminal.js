import React, { Component } from 'react';
import styled from 'styled-components';

import {
  Medium
} from '../assets/style/Dimension';

import {
  SecondaryColor,
  GrayColor
} from '../assets/style/Color';

import {
  Mode,
  CMD,
  CMD_INFO,
  CMD_NOTFOUND,
  CMD_PREFIX,
  Greeding,
  Help,
  Whoami,
  Info,
  Github,
  Linkedin,
  Mail
} from '../assets/static/TerminalConfig';

const TerminalContainer = styled.div`
  width: 50%;
  padding: 1.5% 0;
  overflow: hidden;
  @media (max-width: ${Medium}) {
    width: 100%;
  }
`;

const Lines = styled.ul`
  margin: 0;
  padding: 0;
  padding-right: 2.5%;
  height: 100%;
  width: 97.5%;
  list-style: none;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  color: ${GrayColor};
  font-size: 1.8rem;
  line-height: 2rem;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar { display: none; }
  @media (max-width: ${Medium}) {
    padding-right: 0%;
    width: 100%;
  }
`;

const LineContainer = styled.li`
  padding-bottom: 0.5rem;
  display: flex;
`;

const Line = styled.div`
  display: inline-block;
`;

const InputContainer = styled.form`
  display: inline-block;
  flex: 1;
`;

const InputLabel = styled.span`
  display: inline-block;
  line-height: 2rem;
`

const InputDefaultLabel = styled(InputLabel)`
  padding-right: 1rem;
  font-size: 1.3rem;
  color: ${SecondaryColor};
`;

const InputTextLabel = styled(InputLabel)`
  font-size: 1.8rem;
  color: ${GrayColor};
`;

const Input = styled.input`
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  font-family: Lekton, sans-serif;
  font-size: 1.8rem;
  line-height: 2rem;
  color: ${GrayColor};
  background-color: transparent;
`;

const endLine = {
  float: "left",
  clear: "both"
};

class Terminal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      lines: Greeding,
      mode: Mode.default,
    };

    this.mail = [];
    this.mailState = 0;
    this.mailSenderName = React.createRef();
    this.mailSenderEmail = React.createRef();
    this.mailSenderMessage = React.createRef();
    this.mailSenderSend = React.createRef();

    this.log = [];
    this.logIndex = -1;

    this.endLine = null;
  }

  generateOutput(buffer) {
    const arg = buffer.split(' ').filter(i => i !== '');
    const cmd = arg.length === 0 ? CMD.NULL : arg.shift().toLowerCase();

    switch(cmd) {
      case CMD.HELP: return Help;
      case CMD.WHOAMI: return Whoami;
      case CMD.INFO: return this.generateInfo(arg);
      case CMD.GITHUB: return Github;
      case CMD.LINKEDIN: return Linkedin;
      case CMD.MAIL: return this.generateMail();
      case CMD.CLEAR: return [];
      case CMD.NULL: return [];
      default: return [CMD_NOTFOUND + cmd];
    }
  }

  generateInfo(arg) {
    if (arg.length === 0) { return Info.default; }

    const arg1 = arg.shift().toLowerCase();
    switch(arg1) {
      case CMD_INFO.LIST: return Info.list;
      case CMD_INFO.PROJ: return Info.proj;
      case CMD_INFO.EDU: return Info.edu;
      case CMD_INFO.INTEREST: return Info.interest;
      case CMD_INFO.IMAGE: return Info.image;
      default: return [CMD_NOTFOUND + CMD.INFO + arg]
    }
  }

  generateMail() {
    this.setState({ mode: Mode.mail })
    return [];
  }

  onInputSubmit(e) {
    e.preventDefault();
  }

  onInputChange(e) {
    this.setState({ input: e.target.value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      switch(this.state.mode) {
        case Mode.default:
          this.onKeyPressDefault();
          break;
        case Mode.mail:
          this.onKeyPressMail();
          break;
        default:
          break;
      }

    }
  }

  onKeyPressDefault() {
    const buffer = this.state.input.trim();
    const history = buffer === CMD.CLEAR ? [] : this.state.lines;
    const input = buffer === CMD.CLEAR ? [] : [CMD_PREFIX + buffer];
    const output = this.generateOutput(buffer);

    this.setState({
      input: '',
      lines: [
        ...history,
        ...input,
        ...output
      ]
    });

    this.log = [...this.log, buffer];
    this.logIndex = -2;
  }

  onKeyPressMail() {
    const buffer = this.state.input.trim();
    const history = this.state.lines;
    var input = [Mail.stage[this.mailState] + buffer];
    var flag = false;

    if (this.mailState === 1 && !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(buffer)) {
      input = [...input, Mail.invalidMail];
    } else {
      flag = true;
      this.mail.push(buffer);
    }

    if (this.mailState === Mail.stage.length-1) {

      if(this.mailSenderName && this.mailSenderEmail && this.mailSenderMessage && this.mailSenderSend) {
        this.mailSenderName.value = this.mail[0];
        this.mailSenderEmail.value = this.mail[1];
        this.mailSenderMessage.value = this.mail[2];
        this.mailSenderSend.click();
        input = [...input, Mail.success];
      }
      else {
        console.log(this.mailSenderName.current);
        console.log( this.mailSenderEmail.current);
        console.log(this.mailSenderMessage.current);
        console.log(this.mailSenderSend.current);
        input = [...input, Mail.fail];
      };

      this.mailState = 0;
      this.mail = [];
      this.setState({ mode: Mode.default });
    }
    else if(flag){
      this.mailState += 1;
    }

    this.setState({
      input: '',
      lines: [
        ...history,
        ...input
      ]
    })
  }

  onKeyDown(e) {
    var index;
    var buffer;

    if (e.ctrlKey && e.keyCode === 67) {
      this.setState({
        input: '',
        lines: [
          ...this.state.lines
        ]
      });
      this.logIndex = -1;
    }
    else if (e.keyCode === 38) {
      if (this.log.length === 0) { return; }

      index = this.logIndex;

      if (index === -2) { index = this.log.length - 1; }
      else if(index !== -1) { index = index - 1; }


      index === -1 ? buffer = '' : buffer = this.log[index];
      this.setState({ input: buffer });

      this.logIndex = index;
    }
    else if (e.keyCode === 40) {
      if (this.log.length === 0) { return; }

      index = this.logIndex;

      if (index === -2) { index = this.log.length; }
      else if(index !== this.log.length) { index = index + 1; }

      index === this.log.length ? buffer = '' : buffer = this.log[index];
      this.setState({ input: buffer });

      this.logIndex = index;
    }
  }

  componentDidMount() {
    if (this.endLine) { this.endLine.scrollIntoView({ behavior: "instant" }); }
  }

  componentDidUpdate() {
    if (this.endLine) { this.endLine.scrollIntoView({ behavior: "instant" }); }
  }

  render() {
    const { input, lines, mode } = this.state;

    return (
      <TerminalContainer>
        <Lines>
          {lines.map((line, index) =>
            <LineContainer key={index}>
              {(typeof line === 'string' &&
                line.substring(0, CMD_PREFIX.length) === CMD_PREFIX) ?
                <Line>
                  <InputDefaultLabel className="fas fa-chevron-right" />
                  {line.substring(CMD_PREFIX.length)}
                </Line> :
                <Line>
                  {line}
                </Line>}
          </LineContainer>)}

          <LineContainer>
            {mode === Mode.default ?
              <InputDefaultLabel className="fas fa-chevron-right" /> :
              <InputTextLabel>{Mail.stage[this.mailState]}</InputTextLabel>
            }
            <InputContainer onSubmit={this.onInputSubmit}>
              <Input
                autoFocus
                type="text"
                spellCheck="false"
                value={input}
                onChange={this.onInputChange.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={this.onKeyDown.bind(this)}
              />

            </InputContainer>
          </LineContainer>
          <div style={endLine} ref={(el) => this.endLine = el}/>
        </Lines>
        <div hidden>
          <form action={"//formspree.io/"+Mail.to} method="POST">
            <input type="text" name="name" ref={(ref) => this.mailSenderName = ref} />
            <input type="text" name="email" ref={(ref) => this.mailSenderEmail = ref} />
            <input type="text" name="message" ref={(ref) => this.mailSenderMessage = ref} />
            <button type="submit" value="Send" ref={(ref) => this.mailSenderSend = ref } />
            <input type="hidden" name="_format" value="plain" />
            <input type="text" name="_gotcha" />
          </form>
        </div>
      </TerminalContainer>
    );
  }
};

export default Terminal;
