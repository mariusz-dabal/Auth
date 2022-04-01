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

        $today = (new \DateTimeImmutable())->setTime(0,0,0);
        $startDate = $challenge->getStartDate()->setTime(0,0,0);

        return ($today->diff($startDate))->days + 1;
    }
}
