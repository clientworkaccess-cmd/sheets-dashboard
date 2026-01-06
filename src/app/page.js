"use client";

import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/Header';
import HeroSection from '@/components/dashboard/HeroSection';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import FundHighlights from '@/components/dashboard/FundHighlights';
import MainSalesChart from '@/components/dashboard/MainSalesChart';
import CharlotteChecklist from '@/components/dashboard/CharlotteChecklist';
import CharlotteSalesChart from '@/components/dashboard/CharlotteSalesChart';
import KPISection from '@/components/dashboard/CharlotteKPICards';
import MoveInChart from '@/components/dashboard/MoveInChart';
import ForecastFooter from '@/components/dashboard/ForecastFooter';
import HoustonChecklist from '@/components/dashboard/HoustonChecklist';
import HoustonSalesChart from '@/components/dashboard/HoustonSalesChart';
import PerformanceRadar from '@/components/dashboard/PerformanceRadar';
import MajorNews from '@/components/dashboard/MajorNews';
import { useDashboard } from '@/context/DashboardContext';

export default function Home() {
  const { isLoading } = useDashboard();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans transition-colors duration-500">
      <div className="space-y-6">
        {/* Top Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <DashboardHeader />
        </motion.div>

        {/* Main Dashboard Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          id="dashboard-content"
          className="bg-white rounded-[60px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
        >
          {/* Hero Banner */}
          <motion.div variants={itemVariants}>
            <HeroSection />
          </motion.div>

          {/* Portfolio Table */}
          <motion.div variants={itemVariants}>
            <PortfolioOverview />
          </motion.div>

          {/* Middle Section: Highlights & Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <FundHighlights />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <MainSalesChart />
            </motion.div>
          </div>

          {/* Bottom Section: Charlotte Specifics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <CharlotteChecklist />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <CharlotteSalesChart />
            </motion.div>
          </div>

          {/* KPI and Move In/Out Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <KPISection />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <MoveInChart />
            </motion.div>
          </div>
          {/* Bottom Section: Houston Specifics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8 ">
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <HoustonSalesChart />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <HoustonChecklist />
            </motion.div>
          </div>

          {/* KPI and Move In/Out Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <KPISection />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <MoveInChart />
            </motion.div>
          </div>

          {/* Forecast Footer */}
          <motion.div variants={itemVariants}>
            <ForecastFooter />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <MajorNews />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <PerformanceRadar />
          </motion.div>
        </div>
        {/* Bottom Credits / Copyright */}
        <div className="flex justify-center pb-8">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Rethink Self Storage Fund • Dashboard v1.0
          </p>
        </div>
      </div>
    </main>
  );
}
