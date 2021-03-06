<?php

namespace App\Repository;

use App\Entity\Day;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Day|null find($id, $lockMode = null, $lockVersion = null)
 * @method Day|null findOneBy(array $criteria, array $orderBy = null)
 * @method Day[]    findAll()
 * @method Day[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DayRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Day::class);
    }

    public function getDaysDoneByUser(User $user)
    {
        $builder = $this->createQueryBuilder('d')
            ->select(
                'd.reps'

            )
            ->andWhere('d.participant = :participantId')
            ->setParameter('participantId', $user->getId())
            ;

        return $builder->getQuery()->getResult();
    }

    public function findActiveDay(User $user)
    {
        $builder = $this->createQueryBuilder('d')
            ->andWhere('d.participant = :participantId')
            ->andWhere('d.active = true')
            ->setParameter('participantId', $user->getId())
            ->setMaxResults(1)
            ;

        return $builder->getQuery()->getOneOrNullResult();
    }

    // /**
    //  * @return Day[] Returns an array of Day objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Day
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
