USE Children

SELECT * FROM Usuario

UPDATE Usuario Set id = '0930396338' Where nombre = 'santiago'
UPDATE Usuario Set clave = '$2a$10$s57P7fp1EUF6s4YHNjppuuDIsTXMDhjTV0iNY9Eld/u3HWjPae0aa' Where id = '0930396338'
UPDATE Usuario set cargo = 3 Where nombre = 'santiago'

SELECT * FROM Cargo