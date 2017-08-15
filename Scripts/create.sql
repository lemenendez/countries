CREATE DATABASE  IF NOT EXISTS `geo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `geo`;
-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: geo
-- ------------------------------------------------------
-- Server version	5.5.57-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `CountryId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `Name` varchar(128) NOT NULL COMMENT 'Name of the country in english',
  `ISO2LET` varchar(16) NOT NULL COMMENT 'Code in ISO two(2) letters',
  `ISO3LET` varchar(16) DEFAULT NULL COMMENT 'Code ISO three (3) letters',
  `ISONum` int(3) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  PRIMARY KEY (`CountryId`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8 COMMENT='List of Countries';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `LocationId` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `CountryId` int(4) unsigned NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Code` varchar(16) NOT NULL,
  `IsActive` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  PRIMARY KEY (`LocationId`),
  KEY `CountryId` (`CountryId`),
  CONSTRAINT `Location_ibfk_1` FOREIGN KEY (`CountryId`) REFERENCES `Country` (`CountryId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='lists of divitions for a country';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-10 19:01:19