// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IBotProject } from './server';
import { DialogSetting } from './settings';

type Stat = {
  isDir: boolean;
  isFile: boolean;
  isWritable: boolean;
  lastModified: string;
  size: string;
};

type MakeDirectoryOptions = {
  recursive?: boolean;
};

export type IFileStorage = {
  stat(path: string): Promise<Stat>;
  readFile(path: string): Promise<string>;
  readDir(path: string): Promise<string[]>;
  exists(path: string): Promise<boolean>;
  writeFile(path: string, content: any): Promise<void>;
  removeFile(path: string): Promise<void>;
  mkDir(path: string, options?: MakeDirectoryOptions): Promise<void>;
  rmDir(path: string): Promise<void>;
  rmrfDir(path: string): Promise<void>;
  glob(pattern: string | string[], path: string): Promise<string[]>;
  copyFile(src: string, dest: string): Promise<void>;
  rename(oldPath: string, newPath: string): Promise<void>;
  zip(source: string, cb: any): unknown;
};

export type BotTemplate = {
  id: string;
  name: string;
  description: string;
  isMultiBotTemplate?: boolean;
  nodeSupport?: EnvSupport;
  dotnetSupport?: EnvSupport;
  /* absolute path */
  path?: string;
  /* tags for further grouping and search secenario */
  tags?: string[];
  /* list of supported runtime versions */
  support?: string[];
  package?: {
    packageName: string;
    packageSource: string;
    packageVersion: string;
    availableVersions: string[];
  };
  index?: number;
};

export type EnvSupport = {
  webAppSupported: boolean;
  functionsSupported: boolean;
};

export type RuntimeTemplate = {
  /** method used to eject the runtime into a project. returns resulting path of runtime! */
  eject?: (project: IBotProject, localDisk?: any, isReplace?: boolean) => Promise<string>;

  /** build method used for local publish */
  build: (runtimePath: string, project: IBotProject, fullSettings?: DialogSetting, port?: number) => Promise<void>;

  run: (project: IBotProject, localDisk?: any) => Promise<void>;

  installComponent: (
    runtimePath: string,
    componentName: string,
    version: string,
    source: string,
    project: IBotProject,
  ) => Promise<string>;

  uninstallComponent: (runtimePath: string, componentName: string, project: IBotProject) => Promise<string>;

  identifyManifest: (runtimePath: string, project: IBotProject) => string;

  /** build for deploy method */
  buildDeploy: (
    runtimePath: string,
    project: IBotProject,
    settings: DialogSetting,
    profileName: string,
  ) => Promise<string>;

  /** set skill manifest, different folder for different runtime  */
  setSkillManifest: (
    dstRuntimePath: string,
    dstStorage: IFileStorage,
    srcManifestDir: string,
    srcStorage: IFileStorage,
    mode: string,
  ) => Promise<void>;

  /** path to code template */
  path: string;

  /** internal use key */
  key: string;

  /** name of runtime template to display in interface */
  name: string;

  /** command used to start runtime */
  startCommand: string;
};
