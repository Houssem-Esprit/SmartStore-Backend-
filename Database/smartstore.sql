-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 12 sep. 2020 à 17:27
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `smartstore`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `IdArticle` varchar(80) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` tinyint(1) NOT NULL,
  `quantity` int(255) NOT NULL,
  `price` decimal(60,2) NOT NULL,
  `dispo` tinyint(1) NOT NULL,
  `imgArticle` varchar(255) NOT NULL,
  `idUser` varchar(8) NOT NULL,
  PRIMARY KEY (`IdArticle`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`IdArticle`, `name`, `color`, `quantity`, `price`, `dispo`, `imgArticle`, `idUser`) VALUES
('31000000', 'Nike X Off-white Air Jordan', 0, 120, '350.00', 1, 'b9113369742fbc8e8fd293aa7963bfc0.png', '11111111'),
('31000001', 'Nike Mix-720-818', 1, 120, '220.00', 1, '813d33a2e8c3a19031154a2511c76a0b.png', '11111111'),
('31000002', 'Revolution 5 Lace-Up', 1, 190, '310.00', 1, '3e24d891111dcc736fae8496dac013b1.png', '11111111'),
('31000003', 'Nike Air Force 211', 1, 300, '405.00', 1, 'ac4070354b58b661cd9f772f550d146c.png', '11111111'),
('31000004', 'Nike Air Max 270', 1, 50, '376.00', 1, '68aefc8fe9d7ca1cdd2416b675b1185a.png', '11111111'),
('31000005', 'Nike Joyride Dual Run', 1, 700, '230.00', 1, 'f7c9ceb2bc0114501f92725ad64d583c.png', '11111111'),
('31000006', 'Nike SuperRep Go ', 1, 790, '360.00', 1, 'c957e066f5de41ec9cff9bfeeef4906e.png', '11111111'),
('31000007', 'PG 4-LT SMOKE GRIS', 1, 80, '400.00', 1, '7342da2526fa669ebae7717bc146459b.png', '11111111'),
('31000008', 'JORDAN MARS 270', 1, 58, '600.00', 1, '049a79899cd4fbbd8f6992849c55e58d.png', '11111111'),
('32000000', 'Ultra tendance', 1, 30, '290.00', 1, 'f48a000073bfad80110ad5e4e854c6b0.png', '22222222'),
('32000001', 'Bombardier T5YZW', 0, 45, '320.00', 1, '8409aac3000e139204463d2011b163ca.png', '22222222'),
('32000002', 'Collection 2020', 1, 1000, '250.00', 1, 'dda58c942413c269dd9b0ac470c1181d.png', '22222222'),
('32000003', 'pantalon Mickey gets arty', 1, 1020, '230.00', 1, '374ee789e94fe6e6ff3eed187c8f8be2.png', '22222222'),
('32000004', 'Powerpuff Girls t-shirt', 1, 2000, '85.00', 1, '1e567ce41f72c228953fdc9f2fd4449f.png', '22222222'),
('32000005', 'Short denim NBA', 0, 1700, '110.00', 1, 'e4179caadf562d5d34125f1c1245c464.png', '22222222'),
('33000000', 'GoodGirl parfume', 0, 260, '90.00', 1, 'ccf34eea914d2ab54ec8ada84168a6e6.png', '44444444'),
('33000001', 'MASCARA LASH PRINCESS', 0, 500, '65.00', 1, '26badc461a28f904c4b2f6ac27952c17.png', '44444444'),
('33000002', 'Maquillage LT-210 Femme', 1, 506, '109.00', 1, 'ad75681dbffa23bdc5ea6c5c92204c57.png', '44444444'),
('34000000', 'Canard gonflable', 0, 700, '53.00', 1, 'a499be96f793dd91a86c6b2ec671e221.png', '55555555'),
('34000001', 'Pouf velour XL', 1, 1000, '205.00', 1, '57304a17f35579c037b74891a947e406.png', '55555555'),
('34000002', 'ASUS VivoBook s15', 1, 15, '2200.00', 1, 'b144f22d649dbf79ca0534ec7f9305c7.png', '55555555'),
('34000003', 'Sac a dos trolley', 1, 200, '51.50', 1, 'd4da1b0712220173ad874eced56686c6.png', '55555555');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `idNotif` int(11) NOT NULL AUTO_INCREMENT,
  `dateNotif` datetime(6) NOT NULL,
  `idStore` varchar(8) NOT NULL,
  PRIMARY KEY (`idNotif`),
  KEY `idStore` (`idStore`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `idPanier` int(11) NOT NULL AUTO_INCREMENT,
  `idClient` varchar(8) NOT NULL,
  `ArticleName` varchar(255) NOT NULL,
  `price` decimal(60,2) NOT NULL,
  `quantity` int(255) NOT NULL,
  `imageArticle` varchar(255) NOT NULL,
  `idarticle` varchar(8) NOT NULL,
  PRIMARY KEY (`idPanier`),
  KEY `idClient` (`idClient`),
  KEY `idarticle` (`idarticle`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`idPanier`, `idClient`, `ArticleName`, `price`, `quantity`, `imageArticle`, `idarticle`) VALUES
(1, '03328893', '', '0.00', 0, '', '31000000'),
(4, '03328893', '', '408.23', 100, '', '31000000'),
(6, '11111111', '', '250.00', 990, '', '32000002'),
(7, '09887657', '3e24d891111dcc736fae8496dac013b1.png', '310.00', 2, '3e24d891111dcc736fae8496dac013b1.png', '31000002'),
(8, '09887657', 'f7c9ceb2bc0114501f92725ad64d583c.png', '230.00', 1, 'f7c9ceb2bc0114501f92725ad64d583c.png', '31000005'),
(9, '09887657', '049a79899cd4fbbd8f6992849c55e58d.png', '600.00', 921, '049a79899cd4fbbd8f6992849c55e58d.png', '31000008'),
(12, '09887657', 'Nike X Off-white Air Jordan', '350.00', 0, 'b9113369742fbc8e8fd293aa7963bfc0.png', '31000000'),
(13, '99887766', 'Revolution 5 Lace-Up', '310.00', 0, '3e24d891111dcc736fae8496dac013b1.png', '31000002'),
(14, '99887766', 'Revolution 5 Lace-Up', '310.00', 500, '3e24d891111dcc736fae8496dac013b1.png', '31000002'),
(15, '99887766', 'Nike Air Force 211', '405.00', 800, 'ac4070354b58b661cd9f772f550d146c.png', '31000003'),
(16, '99887766', 'JORDAN MARS 270', '600.00', 5, '049a79899cd4fbbd8f6992849c55e58d.png', '31000008'),
(17, '99887766', 'GoodGirl parfume', '90.00', 5, 'ccf34eea914d2ab54ec8ada84168a6e6.png', '33000000'),
(18, '99887766', 'ASUS VivoBook s15', '2200.00', 2, 'b144f22d649dbf79ca0534ec7f9305c7.png', '34000002'),
(19, '55443322', 'Nike Mix-720-818', '220.00', 35, '813d33a2e8c3a19031154a2511c76a0b.png', '31000001'),
(20, '55443322', 'JORDAN MARS 270', '600.00', 200, '049a79899cd4fbbd8f6992849c55e58d.png', '31000008'),
(21, '55443322', 'Nike Air Max 270', '376.00', 30, '68aefc8fe9d7ca1cdd2416b675b1185a.png', '31000004'),
(22, '55443322', 'Nike X Off-white Air Jordan', '350.00', 0, 'b9113369742fbc8e8fd293aa7963bfc0.png', '31000000'),
(23, '09887657', 'Collection 2020', '250.00', 0, 'dda58c942413c269dd9b0ac470c1181d.png', '32000002'),
(24, '09887657', 'Bombardier T5YZW', '320.00', 8, '8409aac3000e139204463d2011b163ca.png', '32000001');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `cin` varchar(8) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `role` tinyint(1) DEFAULT NULL,
  `bluetoothMac` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`cin`, `firstName`, `lastName`, `login`, `password`, `img`, `role`, `bluetoothMac`) VALUES
('03328893', 'admin', 'admin', 'Admin', '33053ba875f4d3343184292fcbca5bba', 'img.jpg', 1, NULL),
('09887657', 'Med Amine', 'Khelifi', 'med-6', '029ab2efab51faf35d81e125f14b522b', '7fb9075af3e7ac5af2d8ce7120410678.png', 1, NULL),
('11111111', 'Nike -Marsa-', '', 'nike', '542eb10be4b072a279815b4f5f415f06', '87c6f1a47a6167cd2327e5603a6b113d.png', 0, '18:D2:76:95:1C:F4'),
('22222222', 'Bershka -Géant-', '', 'Bershka', 'a25eeaec6ba02c8171ac8846d6d7a148', '406d4309b3cb001640d23dd773046f63.png', 0, '20:D2:76:95:1C:F4'),
('33333333', 'Electro Nebli -Géant-', '', 'nebli', 'c065833ca8bc29d4869c9485aaf77dc2', 'e911e0d86c96b51a4df74e4da3e2581b.png', 0, NULL),
('33467543', 'POLO', '', 'polo', 'cf0d0873d41c50d2c4ced7a49b6576f7', '736fb0a0b8f21f13c0c31c22759ee467.png', 0, '30:AE:A4:07:OD:64'),
('44444444', 'Fatale  -Mall Sousse-', '', 'fatale', '0afeac19848533011a400bbd7ecb8c98', '94adff96cfc9254056deb19d7f45ef2a.png', 0, NULL),
('55443322', 'salhoub', 'ben chfancha9', 'salhoub', 'd5cbe1956f638a8e300dbf470ab13c13', 'ab53064b7699b86e1f8d6fba4d16838e.png', 1, NULL),
('55555555', 'Géant -Ariana-', '', 'geant', '816ab1b3eb94c63ac7e7b8f1e66604fc', 'f0b6e92b1bcc4efec395dddd818584b0.png', 0, NULL),
('99887766', 'hama', 'hmayed', 'hama', '5eab401f098d36e0fc7c78721c5fb92a', '5bcd551fbdf7e4dfb82e49f40fcf2f1c.png', 1, NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`cin`);

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`idStore`) REFERENCES `user` (`cin`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `user` (`cin`),
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`idarticle`) REFERENCES `article` (`IdArticle`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
