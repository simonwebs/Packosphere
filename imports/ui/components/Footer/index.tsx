import React from 'react';
import { Heart } from 'heroicons-react';

const Footer = (): JSX.Element => {
  // Getting the current year
  const currentYear = new Date().getFullYear();

  return (
      <footer className="relative">
        <section className="p-10 flex items-center justify-center space-x-1 lg:order-2 text-xl bg-gradient-to-b from-slate-800 to-slate-900">
          <span>Created with</span>
          <span className="flex h-7 w-7 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-600 opacity-30"></span>
            <Heart size={28} className="text-yellow-700 relative z-10" />
          </span>
          <span>by <a href="https://github.com/sponsors/copleykj/" className="text-slate-400">copleykj</a></span>
        </section>
        <div className="bg-slate-900 px-4 py-6">
          <div className="container m-auto flex flex-col text-center lg:grid grid-cols-4 space-y-10 lg:space-y-0">
          <aside className="space-y-1">
            <h2 className="text-lg font-bold text-yellow-700 mb-4">Packosphere</h2>
            <ul className="li"><a href="https://github.com/sponsors/copleykj">Sponsor Development</a></ul>
            <ul className="li"><a href="https://github.com/Meteor-Community-Packages/Packosphere/issues">Report Issues</a></ul>
            <ul className="li"><a href="https://github.com/Meteor-Community-Packages/Packosphere/">Pitch In</a></ul>
          </aside>
          <aside className="space-y-1">
            <h2 className="text-lg font-bold text-yellow-700 mb-4">Meteor Resources</h2>
            <ul className="li"><a href="https://cloud.meteor.com">Meteor Cloud</a></ul>
            <ul className="li"><a href="https://guide.meteor.com">Meteor Guide</a></ul>
            <ul className="li"><a href="https://docs.meteor.com">Meteor Docs</a></ul>
          </aside>
          <aside className="space-y-1">
            <h2 className="text-lg font-bold text-yellow-700 mb-4">Jobs</h2>
            <ul className="li"><a href="https://weworkmeteor.com">WeWorkMeteor</a></ul>
            <ul className="li"><a href="https://jobs.meteor.com">Meteor Jobs</a></ul>
          </aside>
          <aside className="space-y-1">
            <h2 className="text-lg font-bold text-yellow-700 mb-4">Community Resources</h2>
            <ul className="li"><a href="https://github.com/Urigo/awesome-meteor">Awesome Meteor</a></ul>
            <ul className="li"><a href="https://www.meteor-tuts.com/">Meteor Tuts</a></ul>
          </aside>
        </div>
      </div>
      {/* Date Range and GitHub Icon */}
      <div className="bg-slate-900 text-slate-400 px-4 py-2 flex justify-center items-center">
        <span className="text-center mx-2">© 2020 - {currentYear}</span>
        <a href="https://github.com/Meteor-Community-Packages" className="flex items-center mx-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
