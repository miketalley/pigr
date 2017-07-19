// Writes new cron task to /etc/crontab
// Format:
// # pigr task <taskId> - <taskName>
// minute hour dayOfMonth month dayOfWeek user command
// # end task <taskId>

const fs = require('fs');
const _ = require('lodash');

const CRONTAB_FILE_LOCATION = '/etc/crontab';
const CRONTAB_HEADER_START = '# pigr task ';
const CRONTAB_FOOTER_START = '# end task ';
const LINE_BREAK = '\r\n';
const COMMANDS = {
  photo: 'raspistill -o ' + __dirname + '/images/img_\%d.jpg -ts'
};

addCronTask({
  id: 1,
  minute: '*/2',
  command: 'photo'
});

function generateCronCommand(opts) {
  const command = COMMANDS[opts.command];
  const cronCommand =
    opts.minute +
    ' ' +
    opts.hour +
    ' ' +
    opts.dayOfMonth +
    ' ' +
    opts.month +
    ' ' +
    opts.dayOfWeek +
    ' ' +
    opts.user +
    ' ' +
    command +
    ';'

  console.log('CC: ', cronCommand);
  return cronCommand;

}

function writeNewCronTask(content) {
  fs.appendFileSync(CRONTAB_FILE_LOCATION, content);
}

function taskExists(id) {
  return fs.readFile(CRONTAB_FILE_LOCATION, 'utf-8', function(err, contents) {
    return contents.indexOf(CRONTAB_HEADER_START + id) !== -1;
  });
}

function generateHeader(id, name) {
  return CRONTAB_HEADER_START + id + (name || '');
}

function generateFooter(id) {
  return CRONTAB_FOOTER_START + id;
}

function generateTaskContent(opts) {
  const defaults = {
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
    user: 'root'
  };
  console.log('Defaults: ', JSON.stringify(defaults));
  console.log('Opts: ', JSON.stringify(opts));
  const cronCommandOptions = _.assign({}, defaults, opts);
  console.log('Cron Opts: ', JSON.stringify(cronCommandOptions));

  const header = generateHeader(opts.id, cronCommandOptions.name);
  const footer = generateFooter(opts.id);
  const command = generateCronCommand(cronCommandOptions);

  return LINE_BREAK + header + LINE_BREAK + command + LINE_BREAK + footer + LINE_BREAK;
}

function addCronTask(opts) {
  const id = opts.id;

  if (!id) {
    console.error('Must provide cron task id!');
  }
  if (!opts.command) {
    console.error('Must provide command for cron task!');
  }
  if (taskExists(id)) {
    return console.error('Task already exists!');
  }

  writeNewCronTask(generateTaskContent(opts));
}
