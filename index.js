// Writes new cron task to /etc/crontab
// Format:
// # pigr task <taskId> - <taskName>
// minute hour dayOfMonth month dayOfWeek user command
// # end task <taskId>

const fs = require('fs');

const CRONTAB_FILE_LOCATION = '/etc/crontab';
const CRONTAB_HEADER_START = '# pigr task ';
const CRONTAB_FOOTER_START = '# end task ';
const LINE_BREAK = '\r\n';

function generateCronCommand(opts) {
  return
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
    opts.command +
    ';'
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
  const cronCommandOptions = Object.assign({}, defaults, opts);

  const header = generateHeader(id, cronCommandOptions.name);
  const footer = generateFooter(id);
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
