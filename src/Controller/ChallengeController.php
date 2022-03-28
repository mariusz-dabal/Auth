<?php

namespace App\Controller;

use App\Entity\Challenge;
use App\Repository\ChallengeRepository;
use App\Service\ChallengeService;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChallengeController extends AbstractController
{
    public function __construct(
        private ChallengeRepository $challengeRepository
    ) {}

    #[Route('/api/challenge/{challenge}', methods: 'GET')]
    public function show(int $challenge): Response
    {
        $challenge = $this->challengeRepository->find($challenge);

        $now = new \DateTimeImmutable();
        $days = $challenge->getDuration() - ($now->diff($challenge->getStartDate()))->days;

        $challengeResponseObject = [
            'name' => $challenge->getName(),
            'duration' => $challenge->getDuration(),
            'days' => $days,
            'reps' => $challenge->getReps(),
            'participants' => $challenge->getParticipants()
        ];

        return $this->json($challengeResponseObject);
    }

    #[Route('/api/challenges', methods: 'POST')]
    public function create(Request $request, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $challenge = new Challenge();
        $challenge->setName($data['name']);
        $challenge->setDuration($data['duration']);
        $challenge->setStartDate(new \DateTimeImmutable());
        $challenge->setReps($data['reps']);

        $entityManager->persist($challenge);
        $entityManager->flush();

        return $this->json('Challenge saved');
    }

}
