export default abstract class AbstractJob {
	abstract run(): void | Promise<void>
}
