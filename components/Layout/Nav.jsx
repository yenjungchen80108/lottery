import Container from './Container';
import styles from './Nav.module.css';
import Wrapper from './Wrapper';
import React, { useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, GlobeIcon } from '@heroicons/react/solid';

const languages = [
  {
    name: '繁體中文',
    description: 'tr',
    icon: GlobeIcon
  },
  {
    name: '簡體中文',
    description: 'zh',
    icon: GlobeIcon
  },
  { 
    name: 'English',
    description: "en",
    icon: GlobeIcon 
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Nav = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };

  return (
    <nav className={styles.nav}>
      <Wrapper className={styles.wrapper}>
        <Container
          className={styles.content}
          alignItems="center"
          justifyContent="space-between"
        >
          <div className={styles.logo}>
            <img width={32} height={32}
              src="/favicon/lucky-draw.png"
              alt=""/>
          </div>
          <div>Lottery</div>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? 'text-gray-900' : 'text-gray-500',
                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                ><span>{t('NAV.LANGUAGE')}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? 'text-gray-600' : 'text-gray-400',
                      'ml-2 h-5 w-5 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {languages.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            onClick={() => changeLanguage(item.description)}
                          >
                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">{item.name}</p>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </Container>
      </Wrapper>
    </nav>
  );
};

export default Nav;
