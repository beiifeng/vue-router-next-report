import type { Entry } from 'qiankun';

declare type MicroAppProps = {
  name: string;
  entry: Entry;
};

const microAppRoute = [
  {
    name: 'sys2',
    port: 7105,
  },
  {
    name: 'ppp',
    port: 7106,
  },
  {
    name: 'tnt',
    port: 7107,
  },
];

const microApps: MicroAppProps[] = microAppRoute.map(({ name, port }) => {
  return {
    name: name,
    entry:
      process.env.NODE_ENV === 'production'
        ? `/${name}/index.html`
        : `//localhost:${port}/${name}/`,
  };
});

export { microApps };
