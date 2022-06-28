-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2022 at 01:26 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `binance`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_1d`
--

CREATE TABLE `data_1d` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_1hr`
--

CREATE TABLE `data_1hr` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_1min`
--

CREATE TABLE `data_1min` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_2hr`
--

CREATE TABLE `data_2hr` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_4hr`
--

CREATE TABLE `data_4hr` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_5min`
--

CREATE TABLE `data_5min` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_12hr`
--

CREATE TABLE `data_12hr` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_15min`
--

CREATE TABLE `data_15min` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_30min`
--

CREATE TABLE `data_30min` (
  `id` int(11) NOT NULL,
  `symbol` varchar(16) NOT NULL,
  `open` float(12,6) NOT NULL,
  `close` float(12,6) NOT NULL,
  `high` float(12,6) NOT NULL,
  `low` float(12,6) NOT NULL,
  `event_number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_1d`
--
ALTER TABLE `data_1d`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_1hr`
--
ALTER TABLE `data_1hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_1min`
--
ALTER TABLE `data_1min`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_2hr`
--
ALTER TABLE `data_2hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_4hr`
--
ALTER TABLE `data_4hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_5min`
--
ALTER TABLE `data_5min`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_12hr`
--
ALTER TABLE `data_12hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_15min`
--
ALTER TABLE `data_15min`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_30min`
--
ALTER TABLE `data_30min`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_1d`
--
ALTER TABLE `data_1d`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_1hr`
--
ALTER TABLE `data_1hr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_1min`
--
ALTER TABLE `data_1min`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_2hr`
--
ALTER TABLE `data_2hr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_4hr`
--
ALTER TABLE `data_4hr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_5min`
--
ALTER TABLE `data_5min`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_12hr`
--
ALTER TABLE `data_12hr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_15min`
--
ALTER TABLE `data_15min`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_30min`
--
ALTER TABLE `data_30min`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
