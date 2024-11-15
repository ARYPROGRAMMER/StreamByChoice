'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Music,
  Home,
  Radio,
  Mic,
  Search,
  Bell,
  LogIn,
  LogOut,
  Users,
  LucideIcon,
} from 'lucide-react';

export function Appbar() {
  const { data: session } = useSession();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.85]);
  const bgColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(31,41,55,0.5)', 'rgba(31,41,55,0.8)']
  );

  return (
    <motion.div
      style={{ opacity, backgroundColor: bgColor }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="px-4 lg:px-6 h-20 flex items-center justify-between w-full backdrop-blur-lg fixed top-0 z-50 shadow-lg"
    >
      {/* Logo Section */}
      <Link className="flex items-center justify-center space-x-2" href="#">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 360] }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Music className="h-8 w-8 text-purple-500 animate-pulse" />
        </motion.div>
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          StreamByChoice
        </span>
      </Link>

      {/* Navigation Links */}
      <motion.nav
        className="hidden md:flex space-x-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <NavLink href="#" icon={Home}>Home</NavLink>
        <NavLink href="#features" icon={Radio}>Features</NavLink>
        <NavLink href="#join" icon={Mic}>Join Now</NavLink>
        <NavLink href="#testimonials" icon={Users}>Testimonials</NavLink>
      </motion.nav>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Search className="h-6 w-6 text-gray-400 cursor-pointer hover:text-purple-400 transition-colors" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Bell className="h-6 w-6 text-gray-400 cursor-pointer hover:text-purple-400 transition-colors" />
        </motion.div>
        {session?.user ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors"
            onClick={() => signIn()}
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(128, 90, 213, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors rounded-full p-2"
    >
      <Link href={href}>
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <span className="font-medium">{children}</span>
        </div>
      </Link>
    </motion.div>
  );
}
