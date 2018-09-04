import Terminal from '../Terminal';
import { GithubAddress, LinkedinAddress, Mail } from '../../assets/static/TerminalConfig';

function clearTerminal(input) {
  input.simulate('change', {target: {value: 'clear'}});
  input.simulate('keypress', {key: 'Enter'});
};

function inputTerminal(input, value, notClear=false) {
  // clear terminal
  if (!notClear) {
    clearTerminal(input);
  }

  // input value
  input.simulate('change', {target: {value: value}});
  input.simulate('keypress', {key: 'Enter'});
}

describe('<Terminal />', () => {
  it('Terminal should contain `Input` instead of `styled.input`', () => {
    const wrapper = shallow(<Terminal />);
    const successInput = wrapper.find('Input');
    const failInput = wrapper.find('styled.input');
    expect(successInput.length).toEqual(1);
    expect(failInput.length).toEqual(0);
  });

  it('Input should change state.input', () => {
    const wrapper = shallow(<Terminal />);
    const input = wrapper.find('Input');

    // change state
    input.simulate('change', {target: {value: 'test'}});
    expect(wrapper.state('input')).toEqual('test');

    // hit 'enter' clear state.input
    input.simulate('keypress', {key: 'Enter'});
    expect(wrapper.state('input')).toEqual('');
  });

  it('Clear should clean Line', () => {
    const wrapper = shallow(<Terminal />);
    const input = wrapper.find('Input');

    // The # of Line should be 2
    const line = wrapper.find('Line');
    expect(line.length).toEqual(2);

    // clear line and enter clear
    clearTerminal(input);

    // Line is updated
    const newLine = wrapper.find('Line');
    expect(newLine.length).toEqual(0);

    // Lines(ul) should have only one LineContainer(li), and it's the input
    const container = wrapper.find('Lines').find('LineContainer');
    expect(container.length).toEqual(1);
    expect(container.find('Input').length).toEqual(1);
  });

  it('help should output help menu', () => {
    const wrapper = shallow(<Terminal />);
    const input = wrapper.find('Input');

    // clear line and enter help
    inputTerminal(input, "help");

    // first Line should be input history
    // second Line should be help menu
    const firstLi = wrapper.find('LineContainer').at(0);
    const secondLi = wrapper.find('LineContainer').at(1);
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('help');
    expect((secondLi.find('Line').props())['children']).toContain("Commond Options:");
  });

  it('whoami should output introduction', () => {
    const wrapper = shallow(<Terminal />);
    const input =wrapper.find('Input');

    // clear line and enter whoami
    inputTerminal(input, "whoami");

    // first Line should be input history
    // second Line should be help menu
    const firstLi = wrapper.find('LineContainer').at(0);
    const secondLi = wrapper.find('LineContainer').at(1);
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('whoami');
    expect((secondLi.find('Line').props())['children']).toContain("Thanks");
  });

  it('info should output info menu', () => {
    const wrapper = shallow(<Terminal />);
    const input =wrapper.find('Input');

    // clear line and enter info
    inputTerminal(input, "info");

    // first line should be input history
    // second line should be the hint
    var firstLi = wrapper.find('LineContainer').at(0);
    var secondLi = wrapper.find('LineContainer').at(1);
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('info');
    expect((secondLi.find('Line').props())['children']).toContain('--list');

    // clear line and enter info --list
    inputTerminal(input, "info --list");

    // first line should be input history
    // second line should be the info list
    firstLi = wrapper.find('LineContainer').at(0);
    secondLi = wrapper.find('LineContainer').at(1);
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('info --list');
    expect((secondLi.find('Line').props())['children']).toContain("proj");
    expect((secondLi.find('Line').props())['children']).toContain("edu");
    expect((secondLi.find('Line').props())['children']).toContain("interest");
  });

  it('github/linkedin should open page', () => {
    const wrapper = shallow(<Terminal />);
    const input =wrapper.find('Input');

    // Subtest 1: test github
    // clear line and enter github
    inputTerminal(input, "github");

    // first Line should be input history
    // second Line should be description
    // output should have a link
    // link should match
    var firstLi = wrapper.find('LineContainer').at(0);
    var secondLi = wrapper.find('LineContainer').at(1);
    var link = wrapper.find('LineContainer').at(2).find('a');
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('github');
    expect((secondLi.find('Line').props())['children']).toContain("Github page");
    expect(link.length).toEqual(1);
    expect(link.text()).toEqual(GithubAddress);

    // Subtest 1: test linkedin
    // clear line and enter linkedin
    inputTerminal(input, "linkedin");

    // first Line should be input history
    // second Line should be description
    // output should have a link
    // link should match
    var firstLi = wrapper.find('LineContainer').at(0);
    var secondLi = wrapper.find('LineContainer').at(1);
    var link = wrapper.find('LineContainer').at(2).find('a');
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('linkedin');
    expect((secondLi.find('Line').props())['children']).toContain("Linkedin page");
    expect(link.length).toEqual(1);
    expect(link.text()).toEqual(LinkedinAddress);




  });

  it('mail should have correct functionality', () => {
    const wrapper = shallow(<Terminal />);
    const input = wrapper.find('Input');

    // clear line and enter mail
    inputTerminal(input, "mail");

    // first line should be inout history
    // second line should be next input
    var firstLi = wrapper.find('LineContainer').at(0);
    var secondLi = wrapper.find('LineContainer').at(1);
    expect(firstLi.find('InputDefaultLabel').length).toEqual(1);
    expect((firstLi.find('Line').props())['children'][1]).toEqual('mail');
    expect(secondLi.find('InputTextLabel').length).toEqual(1);
    expect((secondLi.find('InputTextLabel').props())['children']).toEqual(Mail.stage[0]);

    // clear line and enter help
    inputTerminal(input, "user", true);

    // first line should be inout history
    // second line should be next input
    var firstLi = wrapper.find('LineContainer').at(1);
    var secondLi = wrapper.find('LineContainer').at(2);
    expect((firstLi.find('Line').props())['children']).toContain(Mail.stage[0]);
    expect(secondLi.find('InputTextLabel').length).toEqual(1);
    expect((secondLi.find('InputTextLabel').props())['children']).toEqual(Mail.stage[1]);

    // clear line and enter help
    inputTerminal(input, "test@test.com", true);

    // first line should be inout history
    // second line should be next input
    var firstLi = wrapper.find('LineContainer').at(2);
    var secondLi = wrapper.find('LineContainer').at(3);
    expect((firstLi.find('Line').props())['children']).toContain(Mail.stage[1]);
    expect(secondLi.find('InputTextLabel').length).toEqual(1);
    expect((secondLi.find('InputTextLabel').props())['children']).toEqual(Mail.stage[2]);

    // skip ref object
    if(wrapper.instance()['mailSenderName']['current']
    && wrapper.instance()['mailSenderEmail']['current']
    && wrapper.instance()['mailSenderMessage']['current']
    && wrapper.instance()['mailSenderSend']['current']) {
      // clear line and enter help
      inputTerminal(input, "1234", true);

      // // first line should be inout history
      var firstLi = wrapper.find('LineContainer').at(3);
      expect((firstLi.find('Line').props())['children']).toContain(Mail.stage[2]);
    };
  });

  it('mail should check email format', () => {
    const wrapper = shallow(<Terminal />);
    const input = wrapper.find('Input');
    var li;

    // clean and get into email enter section
    inputTerminal(input, "mail");
    inputTerminal(input, "user", true);

     // case 1: no '@'
    inputTerminal(input, "testtest.com", true);
    li = wrapper.find('LineContainer').at(3);
    expect((li.find('Line').props())['children']).toEqual(Mail.invalidMail);

    // case 2: no '.'
    inputTerminal(input, "test@testcom", true);
    li = wrapper.find('LineContainer').at(5);
    expect((li.find('Line').props())['children']).toEqual(Mail.invalidMail);

    // case 3: miss part
    inputTerminal(input, "test@test.", true);
    li = wrapper.find('LineContainer').at(7);
    expect((li.find('Line').props())['children']).toEqual(Mail.invalidMail);

    // case 4: reverse
    inputTerminal(input, "test.test@com", true);
    li = wrapper.find('LineContainer').at(9);
    expect((li.find('Line').props())['children']).toEqual(Mail.invalidMail);

    // case 5: reverse
    inputTerminal(input, "test@test.com", true);
    li = wrapper.find('LineContainer').at(10);
    expect((li.find('Line').props())['children']).toContain(Mail.stage[1]);
  });
});
