<?php

namespace App\Controller;

use App\Entity\Challenge;
use App\Repository\ChallengeRepository;
use App\Repository\DayRepository;
use App\Repository\UserRepository;
use App\Service\ChallengeService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class ChallengeController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
//        private TokenStorageInterface $tokenStorage,
        private EntityManagerInterface $entityManager,
        private ChallengeService $challengeService
    ) {}

    #[Route('/api/challenges/{challenge}', methods: 'GET')]
    public function show(Challenge $challenge): Response
    {
        $dayOfChallenge = $this->challengeService->getDayOfChallenge($challenge->getId());

        $participants = [];

        $today = new \DateTimeImmutable();

        foreach ($challenge->getParticipants() as $participant) {
            $daysDone = 0;
            $totalReps = 0;
            $repsToday = 0;
            foreach ($participant->getDays() as $day) {
                if ($day->getReps() === 100) {
                    $daysDone++;
                }

                if ($day->getActive()) {
                    $repsToday = $day->getReps();
                }

                $totalReps += $day->getReps();
            }

            $participants[] = [
                'name' => $participant->getname(),
                'days_done' => $daysDone,
                'reps_total' => $totalReps,
                'reps_today' => $repsToday,
            ];
        }

        $challengeResponseObject = [
            'name' => $challenge->getName(),
            'duration' => $challenge->getDuration(),
            'day' => $dayOfChallenge,
            'reps' => $challenge->getReps(),
            'participants' => $participants,
            'time' => $today->format('Y-m-d\TH:i:sO'),
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

    #[Route('/api/challenges/{challenge}', methods: 'PATCH')]
    public function patch(Request $request, Challenge $challenge)
    {
        $data = json_decode($request->getContent(), true);
        $userId = $data['user_id'];

        if (empty($userId)) {
            return $this->json('no user_id');
        }

        $participant = $this->userRepository->find($userId);
        $challenge->addParticipant($participant);

        $this->entityManager->persist($challenge);
        $this->entityManager->flush();

        return $this->json('Participant added successfully');
    }
}
