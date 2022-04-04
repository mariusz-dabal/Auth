<?php

namespace App\Controller;

use App\Entity\Day;
use App\Repository\DayRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class DayController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private TokenStorageInterface $tokenStorage,
        private DayRepository $dayRepository,
        private UserRepository $userRepository
    )
    {
    }

    #[Route('/api/me/day', methods: 'GET')]
    public function get(): Response
    {
        $userIdentifier = $this->tokenStorage->getToken()->getUser()->getUserIdentifier();
        $user = $this->userRepository->findBy(['email' => $userIdentifier])[0];

        /** @var Day $currentDay */
        $currentDay = $this->dayRepository->findActiveDay($user);

        if (null === $currentDay) {
            return $this->json('No active day')->setStatusCode(Response::HTTP_NOT_FOUND);
        }

        $totalReps = 0;
        foreach ($user->getDays() as $day) {
            $totalReps += $day->getReps();
        }

        $dayResponseObject = [
            'reps_today' => $currentDay->getReps(),
            'reps_total' => $totalReps,
        ];

        return $this->json($dayResponseObject);
    }

    #[Route('/api/me/day', methods: 'PATCH')]
    public function patch(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data) || !$data['reps']) {
            return $this->json('No reps')->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $userIdentifier = $this->tokenStorage->getToken()->getUser()->getUserIdentifier();
        $user = $this->userRepository->findBy(['email' => $userIdentifier])[0];

        /** @var Day $currentDay */
        $currentDay = $this->dayRepository->findActiveDay($user);

        if (null === $currentDay) {
            return $this->json('No active day')->setStatusCode(Response::HTTP_NOT_FOUND);
        }

        $reps = $currentDay->getReps() + $data['reps'];
        if ($reps > 100) {
            return $this->json("That's enough!")->setStatusCode(Response::HTTP_BAD_REQUEST);
        }

        $currentDay->setReps($reps);

        $this->entityManager->persist($currentDay);
        $this->entityManager->flush();

        $totalReps = 0;
        foreach ($user->getDays() as $day) {
            $totalReps += $day->getReps();
        }

        $dayResponseObject = [
            'reps_today' => $currentDay->getReps(),
            'reps_total' => $totalReps,
        ];

        return $this->json($dayResponseObject);
    }
}
