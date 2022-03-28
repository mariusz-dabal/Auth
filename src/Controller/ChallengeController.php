<?php

namespace App\Controller;

use App\Repository\ChallengeRepository;
use App\Service\ChallengeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChallengeController extends AbstractController
{
    public function __construct(
        private ChallengeService $challengeService,
        private ChallengeRepository $challengeRepository
    ) {}

    #[Route('/api/challenge/{challenge}', methods: 'GET')]
    public function index(int $challenge): Response
    {
        $challenge = $this->challengeRepository->find($challenge);
        return $this->json($challenge);
    }

    #[Route('/api/challenges', methods: 'POST')]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        dd($data);
        return $this->json($request->getContent());
    }

}
