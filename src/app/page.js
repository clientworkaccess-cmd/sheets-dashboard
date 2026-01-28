"use client";

import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/dashboard/Header';
import HeroSection from '../components/dashboard/HeroSection';
import PortfolioOverview from '../components/dashboard/PortfolioOverview';
import FundHighlights from '../components/dashboard/FundHighlights';
import MainSalesChart from '../components/dashboard/MainSalesChart';
import CharlotteChecklist from '../components/dashboard/CharlotteChecklist';
import CharlotteSalesChart from '../components/dashboard/CharlotteSalesChart';
import MoveInChart from '../components/dashboard/MoveInChart';
import ForecastFooter from '../components/dashboard/ForecastFooter';
import HoustonChecklist from '../components/dashboard/HoustonChecklist';
import HoustonSalesChart from '../components/dashboard/HoustonSalesChart';
import LeadsChart from '../components/dashboard/LeadsChart';
import OccupiedUnitsChart from '../components/dashboard/OccupiedUnitsChart';
import AcquisitionCostChart from '../components/dashboard/AcquisitionCostChart';
import LifetimeValueChart from '../components/dashboard/LifetimeValueChart';
import RetentionCards from '../components/dashboard/RetentionCards';
import MajorNews from '../components/dashboard/MajorNews';
import { useDashboard } from '../context/DashboardContext';
import CharlotteKPICards from '../components/dashboard/CharlotteKPICards';
import HoustonKPICards from '../components/dashboard/HoustonKpiCards';

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
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col p-4 md:p-8 w-full relative">
        {/* Top Header Section */}
        <DashboardHeader />
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 transition-colors duration-500">
      <div className="space-y-6">
        {/* Top Header Section */}
        <DashboardHeader />

        {/* Main Dashboard Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          id="dashboard-content"
          className="space-y-8"
        >
          <div className="bg-white rounded-[60px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
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
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <CharlotteChecklist />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <CharlotteSalesChart />
              </motion.div>
            </div>

            {/* KPI and Move In/Out Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <CharlotteKPICards />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <MoveInChart type="charlotte" />
              </motion.div>
            </div>
            {/* Bottom Section: Houston Specifics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8 ">
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <HoustonChecklist />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <HoustonSalesChart />
              </motion.div>
            </div>

            {/* KPI and Move In/Out Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <HoustonKPICards />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <MoveInChart type="houston" />
              </motion.div>
            </div>

            {/* Forecast Footer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
              <motion.div variants={itemVariants} className="lg:col-span-7 ">
                <ForecastFooter />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <MajorNews />
              </motion.div>
            </div>
          </div>

          <div className="bg-white rounded-[60px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
            <h1 className="text-2xl font-bold text-[#1e293b] mb-12">Rethink Self Storage Fund - KPI Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12 pb-12 ">
              {/* Acquisition Column */}
              <div className="space-y-6">
                <h2 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-[0.2em] ml-2">Acquisition</h2>
                <div className="space-y-6">
                  <LeadsChart />
                  <AcquisitionCostChart />
                </div>
              </div>

              {/* Expansion Column */}
              <div className="space-y-6">
                <h2 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-[0.2em] ml-2">Expansion</h2>
                <div className="space-y-6">
                  <OccupiedUnitsChart />
                  <LifetimeValueChart />
                </div>
              </div>

              {/* Retention Column */}
              <div className="space-y-6">
                <h2 className="text-[#8e9aaf] text-xs font-bold uppercase tracking-[0.2em] ml-2">Retention</h2>
                <RetentionCards />
              </div>
            </div>
          </div>
        </motion.div>
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
