<?php

namespace App\Service;

use App\Repository\ChallengeRepository;

class ChallengeService
{
    public function __construct(ChallengeRepository $challengeRepository)
    {
    }

    public function save(int $challenge): int
    {
        return $challenge;
    }
}
