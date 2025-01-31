import { Meteor } from 'meteor/meteor';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Terminal, Exclamation, ExternalLinkOutline, Scale } from 'heroicons-react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai as codeStyles } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link, useParams } from 'react-router-dom';
import ago from 's-ago';
import slug from 'slug';

import { QPackageInfo, ILatestPackagesQueryResult } from '../../../../api/LatestPackages';
import useQuery from '../../hooks/useStaticQuery';
import Page from '../../components/Page';
import { getAgeInYears, formatDateToString } from '../../../utils';

const heading = ({ level, children }: { level: number, children: React.ReactNode }): React.ReactNode => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return <Heading id={slug(String(children ?? ''))} children={children} />;
};

const renderers = {
  code: ({ inline, className, children, ...props }: { inline?: boolean, className?: string, children: React.ReactNode }) => {
    const match = /language-(\w+)/.exec(className ?? '');
    const languages = [
      'ts',
      'typescript',
      'js',
      'javascript',
      'cs',
      'coffeescript',
      'html',
      'jsx',
      'json',
      'css',
    ];
    if (typeof inline !== 'undefined' && inline) {
      return <code className={className} {...props}>{children}</code>;
    } else {
      const language = match?.[1] ?? '';
      const value = children ?? '';
      return <SyntaxHighlighter style={codeStyles} language={language} showLineNumbers={languages.includes(language)} children={String(value).replace(/\n$/, '')} />;
    }
  },
  h1: heading,
  h2: heading,
  h3: heading,
  h4: heading,
  h5: heading,
  h6: heading,
};

const PackagePage = (): JSX.Element => {
  const { username, packagename, version } = useParams<{ username: string, packagename: string, version: string | undefined }>();
  const { data, refetch } = useQuery({
    query: QPackageInfo,
    config: { fetchOne: true },
    params: { username, packageName: packagename },
  });

  let pkg;
  let displayVersion;
  let age = 0;

  if (typeof data !== 'undefined') {
    pkg = data as ILatestPackagesQueryResult;
    const neededVersion = version ?? pkg?.version;
    displayVersion = pkg.versions.find(v => v.version === neededVersion);
    age = getAgeInYears(displayVersion?.published);
  }
  const old = age >= 3;

  let publishedIndicator: string;

  switch (age) {
    case 0:
    case 1:
      publishedIndicator = 'text-slate-400';
      break;
    case 2:
      publishedIndicator = 'text-yellow-300';
      break;
    case 3:
      publishedIndicator = 'text-yellow-600 animate-pulse';
      break;
    default:
      publishedIndicator = 'text-red-600 animate-pulse';
      break;
  }

  useEffect(() => {
    Meteor.call('updateExternalPackageData', `${username !== 'meteor' ? `${username}:` : ''}${packagename}`, version,
      (error: Meteor.Error, result: boolean) => {
        if (typeof error === 'undefined') {
          if (result) {
            refetch();
          }
        }
      },
    );
  }, [version]);

  return (
    <Page>
      {typeof pkg !== 'undefined' && typeof displayVersion !== 'undefined'
        ? <>
          <Helmet>
            <title>{pkg.packageName} - Packosphere</title>
            <meta name="description" content={displayVersion.description} />
          </Helmet>
          <section className="flex flex-col space-y-6  pb-3">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-semibold">{displayVersion.packageName}</h1>
              <p className="flex space-x-2">
                <span className="text-slate-400">
                  v{displayVersion?.version}
                </span>
                <span>&bull;</span>
                <span className={publishedIndicator}>
                  Published {ago(displayVersion.published)}
                </span>
              </p>
            </div>
            {old && <p className="font-bold text-red-600 text-lg italic">
              This package has not had recent updates. Please investigate it's current state before
              committing to using it in your project.
            </p>}
            <p className="text-lg">{displayVersion.description}</p>
          </section>

          <section className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6 items-start">
            <aside className="flex flex-col space-y-6 lg:order-2 xl:col-span-1">
              <div>
                <h3 className="text-yellow-500 text-lg mb-4">Installation</h3>
                <div className="flex items-center border-slate-600 border px-4 py-2 overflow-hidden whitespace-pre rounded-md space-x-4">
                  <Terminal size={22} className="flex-none" />
                  <code className="select-all">
                    meteor add {pkg.packageName}
                  </code>
                </div>
              </div>
              {typeof pkg.meta?.repoInfo !== 'undefined' && pkg.meta.repoInfo !== null &&
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="flex items-center justify-between text-yellow-500 text-lg mb-4">
                      <span>Repo</span>
                      <span className="text-xs text-slate-400">{typeof pkg.meta.repoInfo.pushed_at !== 'undefined' && `Pushed ${ago(new Date(pkg.meta.repoInfo.pushed_at))}`}</span>
                    </h3>
                    <a href={pkg.git} target="_blank" className="flex items-center border-slate-600 border px-4 py-2 overflow-hidden whitespace-pre rounded-md space-x-4">
                      <ExternalLinkOutline size={22} className="flex-none" />
                      <span>{pkg.git}</span>
                    </a>
                  </div>
                  <div className="flex items-center space-x-6 text-center lg:space-x-4">
                    <a href={`${pkg.meta.repoInfo.html_url}/issues`} target="_blank" className="flex items-center space-x-2 font-bold">
                      <span>{pkg.meta.repoInfo.open_issues} issues</span>
                    </a>
                    <a href={`${pkg.meta.repoInfo.html_url}/stargazers`} target="_blank" className="flex items-center space-x-2 font-bold">
                      <span>{pkg.meta.repoInfo.stargazers_count} stars</span>
                    </a>
                    <a href={`${pkg.meta.repoInfo.html_url}/network/members`} target="_blank" className="flex items-center space-x-2 font-bold">
                      <span>{pkg.meta.repoInfo.forks_count} forks</span>
                    </a>
                    <a href={`${pkg.meta.repoInfo.html_url}/watchers`} target="_blank" className="flex items-center space-x-2 font-bold">
                      <span>{pkg.meta.repoInfo.watchers_count} watchers</span>
                    </a>
                  </div>
                  <div className="flex space-x-6 items-center">
                    <span className="flex w-7 h-7 bg-white items-end justify-end rounded-sm">
                      <span className="text-slate-800 font-extrabold text-xl font-mono -mb-1">
                        {pkg.meta.repoInfo.language === 'TypeScript' ? 'TS' : 'JS'}
                      </span>
                    </span>
                    <p className="flex items-center space-x-2">
                      <Scale size={25} className="inline-block" /><span className="font-bold">{pkg.meta.repoInfo.license?.spdx_id ?? 'No License'}</span>
                    </p>
                  </div>
                </div>
              }

              <div>
                <h3 className="text-yellow-500 text-lg mb-4">Versions</h3>
                <div className="flex flex-col border-slate-600 border px-4 py-4 overflow-hidden whitespace-pre rounded-md space-y-4">
                  {pkg.versions.map(version => {
                    return (
                      <Link to={`/${username}/${packagename}/${version.version}`} className="flex items-center space-x-2" key={version._id} >
                        <span>v{version.version}</span><span className="text-gray-500 text-sm">{formatDateToString(version.published)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

            </aside>
            <article className="lg:order-1 xl:col-span-3">
              {typeof displayVersion.readme !== 'undefined' && displayVersion.readme.fullText !== null
                ? <div className="markdown-body bg-slate-700 rounded-md px-5 py-7">
                  {typeof displayVersion.readme.fullText !== 'undefined'
                    ? <ReactMarkdown skipHtml plugins={[gfm]} components={renderers} children={`${displayVersion.readme?.fullText ?? ''}`} />
                    : <p className="text-2xl text-center">Loading...</p>
                  }
                </div>
                : <div className="flex flex-col items-center space-y-10 flex-auto text-center py-10 bg-slate-600 rounded-md">
                  <h1 className="text-2xl font-bold">No Documentation</h1>
                  <Exclamation size={40} className="text-yellow-500" />
                  <p>This package does not contain a README file.</p>
                </div>
              }
            </article>
          </section>
        </>
        : null
      }
    </Page>
  );
};

export default PackagePage;
