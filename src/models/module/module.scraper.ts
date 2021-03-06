import titleCapitalization = require('title-capitalization');
import { scrape } from '../../webscraper';
import { Module } from './module.model';
import { IModule } from '../../types/models/IModule';

const codeSelector
  = 'body > b > table > tbody > tr > td > div > center > table > tbody > tr:nth-child(1) > td:nth-child(2)';
const titleSelector
  = 'body > b > table > tbody > tr > td > div > center > table > tbody > tr:nth-child(2) > td:nth-child(2)';

export function parse(moduleCode: string, $: CheerioStatic): IModule {
  const _id = $(codeSelector).text().trim();
  const name = titleCapitalization($(titleSelector).text().trim().toLowerCase());
  return new Module({
    _id: moduleCode,
    name: name || '',
  });
}

export function scrapeModule(moduleCode: string): Promise<IModule> {
  const uri = 'http://www.timetable.ul.ie/tt_moduledetails_res.asp';
  const form = {
    T1: moduleCode,
  };
  return scrape('post', uri, form).then($ => parse(moduleCode, $));
}
