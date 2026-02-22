// @ts-nocheck
import * as __fd_glob_5 from "../content/docs/theming.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/cli.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/changelog.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/accessibility.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"accessibility.mdx": __fd_glob_0, "changelog.mdx": __fd_glob_1, "cli.mdx": __fd_glob_2, "index.mdx": __fd_glob_3, "installation.mdx": __fd_glob_4, "theming.mdx": __fd_glob_5, });