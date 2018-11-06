import {Configuration, Project} from '@berry/core';
import {Writable}               from 'stream';

export default (concierge: any) => concierge

  .command(`workspaces list`)
  .describe(`list all available workspaces`)

  .action(async ({cwd, stdout}: {cwd: string, stdout: Writable}) => {
    const configuration = await Configuration.find(cwd);
    const {project} = await Project.find(configuration, cwd);

    for (const cwd of project.workspacesByCwd.keys())
      stdout.write(`${cwd}\n`);

    return 0;
  });