<?php

namespace App\Service;

use App\Entity\Challenge;
use App\Repository\ChallengeRepository;

class ChallengeService
{
    public function __construct(private ChallengeRepository $challengeRepository)
    {
    }

    public function save(int $challenge): int
    {
        return $challenge;
    }

    public function getDayOfChallenge(int $challengeId): bool|int
    {
        /** @var Challenge*/
        $challenge = $this->challengeRepository->find($challengeId);

        $today = new \DateTimeImmutable();
        $startDate = $challenge->getStartDate();
        $endDate = $startDate->add(new \DateInterval("P{$challenge->getDuration()}D"));

        return ($endDate->diff($today))->days;
    }
}
