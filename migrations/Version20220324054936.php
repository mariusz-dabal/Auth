<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220324054936 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE challenge_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE challenge (id INT NOT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, duration VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN challenge.start_date IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN challenge.duration IS \'(DC2Type:dateinterval)\'');
        $this->addSql('ALTER TABLE "user" ADD challenge_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D64998A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8D93D64998A21AC6 ON "user" (challenge_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D64998A21AC6');
        $this->addSql('DROP SEQUENCE challenge_id_seq CASCADE');
        $this->addSql('DROP TABLE challenge');
        $this->addSql('DROP INDEX IDX_8D93D64998A21AC6');
        $this->addSql('ALTER TABLE "user" DROP challenge_id');
    }
}
